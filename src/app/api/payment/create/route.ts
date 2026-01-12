import { NextRequest, NextResponse } from "next/server";
import type {
  PaymentGatewayRequest,
  PayrexxGatewayPayload,
  PayrexxGatewayResponse,
} from "@/types/payment.types";
import {
  toCents,
  validateAmount,
  validateCurrency,
  generateReferenceId,
  getRedirectUrls,
  sanitizeString,
  retryWithBackoff,
} from "@/lib/utils/payment.utils";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: PaymentGatewayRequest = await request.json();
    const {
      amount,
      currency = "CHF",
      donationData,
      paymentMethod = "other",
      metadata = {},
    } = body;

    // Validate required fields
    if (!amount || !donationData) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: amount, donationData",
        },
        { status: 400 }
      );
    }

    // Check if cart has items
    if (!donationData.cartItems || donationData.cartItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart is empty. Please add at least one donation item.",
        },
        { status: 400 }
      );
    }

    // Validate amount
    const amountValidation = validateAmount(amount);
    if (!amountValidation.valid) {
      return NextResponse.json(
        { success: false, error: amountValidation.error },
        { status: 400 }
      );
    }

    // Validate currency
    if (!validateCurrency(currency)) {
      return NextResponse.json(
        { success: false, error: `Unsupported currency: ${currency}` },
        { status: 400 }
      );
    }

    // Get Payrexx configuration from environment
    const PAYREXX_INSTANCE =
      process.env.NEXT_PUBLIC_PAYREXX_INSTANCE?.toLowerCase(); // Normalize to lowercase
    const PAYREXX_API_SECRET = process.env.PAYREXX_API_SECRET;
    const PAYREXX_API_BASE_URL =
      process.env.PAYREXX_API_BASE_URL || "https://api.payrexx.com/v1.0";
    const BASE_URL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!PAYREXX_INSTANCE || !PAYREXX_API_SECRET) {
      console.error("Missing Payrexx configuration");
      return NextResponse.json(
        { success: false, error: "Payment system configuration error" },
        { status: 500 }
      );
    }

    console.log("Payrexx Configuration:", {
      instance: PAYREXX_INSTANCE,
      baseUrl: PAYREXX_API_BASE_URL,
      hasApiSecret: !!PAYREXX_API_SECRET,
      apiSecretLength: PAYREXX_API_SECRET?.length,
    });

    // Validate instance name format (should not contain special characters)
    if (PAYREXX_INSTANCE && !/^[a-z0-9-]+$/.test(PAYREXX_INSTANCE)) {
      console.error("Invalid instance name format:", PAYREXX_INSTANCE);
      return NextResponse.json(
        {
          success: false,
          error: `Invalid Payrexx instance name format. Should only contain lowercase letters, numbers, and hyphens.`,
        },
        { status: 500 }
      );
    }

    // Generate reference ID (or use provided one from frontend)
    const referenceId = body.referenceId || generateReferenceId();

    // Get redirect URLs with referenceId
    const redirectUrls = getRedirectUrls(BASE_URL, referenceId);

    // Prepare donation items description
    const itemsDescription = donationData.cartItems
      .map((item) => `${item.name} (${currency} ${item.amount})`)
      .join(", ");

    // Build Payrexx gateway payload - SIMPLIFIED FOR TESTING
    const payload: any = {
      title: "Donation Payment",
      description: `${
        donationData.frequency === "monthly" ? "Monthly" : "One-time"
      } donation - ${itemsDescription}`,
      amount: toCents(amount),
      currency: currency.toUpperCase(),
      referenceId: referenceId,
      purpose: `Donation - ${referenceId}`,

      // Redirect URLs
      successRedirectUrl: redirectUrls.success,
      failedRedirectUrl: redirectUrls.failed,
      cancelRedirectUrl: redirectUrls.cancel,
    };

    // Configure payment methods based on user selection
    // Payrexx uses "pm" array to specify allowed payment methods
    if (paymentMethod === "twint") {
      // Only allow Twint payment
      payload.pm = ["twint"];
    } else {
      // Allow other payment methods (cards, wallets, etc.)
      // Leave pm undefined or empty to allow all configured methods in Payrexx account
      // Or specify specific methods like: ["mastercard", "visa", "postfinance_card", "postfinance_efinance", "apple_pay", "google_pay", "samsung_pay"]
    }

    console.log("Payment method selected:", paymentMethod);
    console.log("Configured pm array:", payload.pm || "all available methods");

    // Only add fields if email is provided
    if (donationData.userDetails.email) {
      payload.contact_email = sanitizeString(donationData.userDetails.email);

      // Add name fields if provided
      if (donationData.userDetails.fullName) {
        const nameParts = donationData.userDetails.fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        if (firstName) {
          payload.contact_forename = sanitizeString(firstName);
        }

        if (lastName) {
          payload.contact_surname = sanitizeString(lastName);
        }
      }

      // Add other contact fields if provided
      if (donationData.userDetails.phone) {
        payload.contact_phone = sanitizeString(donationData.userDetails.phone);
      }
      if (donationData.userDetails.address) {
        payload.contact_street = sanitizeString(
          donationData.userDetails.address
        );
      }
      if (donationData.userDetails.city) {
        payload.contact_place = sanitizeString(donationData.userDetails.city);
      }
      if (donationData.userDetails.postalCode) {
        payload.contact_postcode = sanitizeString(
          donationData.userDetails.postalCode
        );
      }
      if (donationData.userDetails.country) {
        payload.contact_country = sanitizeString(
          donationData.userDetails.country
        );
      }
    }

    console.log(
      "Creating Payrexx gateway with payload:",
      JSON.stringify(payload, null, 2)
    );

    // Create gateway with retry logic
    const gatewayResponse = await retryWithBackoff<PayrexxGatewayResponse>(
      async () => {
        // Construct URL with proper encoding
        const params = new URLSearchParams({
          instance: PAYREXX_INSTANCE,
        });
        const apiUrl = `${PAYREXX_API_BASE_URL}/Gateway/?${params.toString()}`;

        console.log("Making request to Payrexx:", {
          url: apiUrl,
          instance: PAYREXX_INSTANCE,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": `${PAYREXX_API_SECRET.substring(0, 10)}...`,
          },
        });

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": PAYREXX_API_SECRET,
          },
          body: JSON.stringify(payload),
        });

        console.log(
          "Payrexx response status:",
          response.status,
          response.statusText
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Payrexx API Error Response:", {
            status: response.status,
            statusText: response.statusText,
            error: errorData,
            payload: payload,
          });
          throw new Error(
            errorData.message ||
              `Payrexx API error: ${response.status} ${response.statusText}`
          );
        }

        return response.json();
      },
      3, // max retries
      1000 // base delay in ms
    );

    // Check response
    if (gatewayResponse.status === "success" && gatewayResponse.data?.[0]) {
      const gateway = gatewayResponse.data[0];

      console.log("Payment gateway created successfully:", {
        gatewayId: gateway.id,
        hash: gateway.hash,
        paymentLink: gateway.link,
        qrLink: gateway.qrlink,
        referenceId,
        amount,
        currency,
      });

      console.log("Full gateway response:", JSON.stringify(gateway, null, 2));

      return NextResponse.json({
        success: true,
        data: {
          gatewayId: gateway.id,
          hash: gateway.hash,
          paymentLink: gateway.link,
          qrLink: gateway.qrlink,
          referenceId,
        },
      });
    }

    throw new Error(
      gatewayResponse.message || "Failed to create payment gateway"
    );
  } catch (error: any) {
    console.error("Payment Gateway Creation Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to create payment gateway. Please try again.",
      },
      { status: 500 }
    );
  }
}
