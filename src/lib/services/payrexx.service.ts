// Payrexx API Service - Client-side wrapper for API routes

import type {
  PaymentGatewayRequest,
  PaymentGatewayResponse,
  PaymentStatusResponse,
} from "@/types/payment.types";

class PayrexxService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "/api/payment";
  }

  /**
   * Create a payment gateway
   */
  async createGateway(
    request: PaymentGatewayRequest
  ): Promise<PaymentGatewayResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment gateway");
      }

      return data;
    } catch (error) {
      console.error("CreateGateway Error:", error);
      throw error;
    }
  }

  /**
   * Get payment status by gateway ID
   */
  async getPaymentStatus(gatewayId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/status/${gatewayId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch payment status");
      }

      return data;
    } catch (error) {
      console.error("GetPaymentStatus Error:", error);
      throw error;
    }
  }

  /**
   * Redirect to payment link
   */
  redirectToPayment(hash: string): void {
    if (typeof window === "undefined") return;

    const instance = process.env.NEXT_PUBLIC_PAYREXX_INSTANCE;

    if (!instance) {
      throw new Error("NEXT_PUBLIC_PAYREXX_INSTANCE is not defined");
    }

    const paymentUrl = `https://${instance}.payrexx.com/pay/${hash}`;

    console.log("Redirecting to Payrexx payment:", {
      instance,
      hash,
      paymentUrl,
    });

    window.location.href = paymentUrl;
  }
}

// Export singleton instance
export const payrexxService = new PayrexxService();
