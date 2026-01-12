import { NextRequest, NextResponse } from "next/server";
import { retryWithBackoff, fromCents } from "@/lib/utils/payment.utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gatewayId: string }> }
) {
  try {
    const { gatewayId } = await params;

    if (!gatewayId) {
      return NextResponse.json(
        { success: false, error: "Gateway ID is required" },
        { status: 400 }
      );
    }

    // Get Payrexx configuration
    const PAYREXX_INSTANCE = process.env.PAYREXX_INSTANCE;
    const PAYREXX_API_SECRET = process.env.PAYREXX_API_SECRET;
    const PAYREXX_API_BASE_URL =
      process.env.PAYREXX_API_BASE_URL || "https://api.payrexx.com/v1.0";

    if (!PAYREXX_INSTANCE || !PAYREXX_API_SECRET) {
      return NextResponse.json(
        { success: false, error: "Payment system configuration error" },
        { status: 500 }
      );
    }

    // Fetch gateway status with retry
    const gatewayData = await retryWithBackoff(
      async () => {
        const response = await fetch(
          `${PAYREXX_API_BASE_URL}/Gateway/${gatewayId}/?instance=${PAYREXX_INSTANCE}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": PAYREXX_API_SECRET,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch gateway status"
          );
        }

        return response.json();
      },
      3,
      1000
    );

    if (gatewayData.status === "success" && gatewayData.data?.[0]) {
      const gateway = gatewayData.data[0];

      return NextResponse.json({
        success: true,
        data: {
          status: gateway.status || "waiting",
          transactionId: gateway.invoices?.[0]?.transactions?.[0]?.id,
          amount: gateway.amount ? fromCents(gateway.amount) : undefined,
          currency: gateway.currency,
          paymentMethod:
            gateway.invoices?.[0]?.transactions?.[0]?.payment?.brand,
        },
      });
    }

    throw new Error(gatewayData.message || "Failed to fetch gateway status");
  } catch (error: any) {
    console.error("Payment Status Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch payment status",
      },
      { status: 500 }
    );
  }
}
