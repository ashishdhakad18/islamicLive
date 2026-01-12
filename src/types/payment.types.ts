// Payment-related TypeScript interfaces and types

export interface PaymentGatewayRequest {
  amount: number;
  currency?: string;
  referenceId?: string;
  paymentMethod?: "twint" | "other";
  donationData: {
    frequency: "one-time" | "monthly";
    cartItems: Array<{
      id: string;
      name: string;
      amount: number;
      causeId?: string;
    }>;
    userDetails: {
      civility?: string;
      fullName: string;
      email: string;
      phone?: string;
      address?: string;
      city?: string;
      country?: string;
      postalCode?: string;
    };
  };
  metadata?: Record<string, any>;
}

export interface PaymentGatewayResponse {
  success: boolean;
  data?: {
    gatewayId: number;
    hash: string;
    paymentLink: string;
    qrLink?: string;
  };
  error?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  data?: {
    status:
      | "waiting"
      | "authorized"
      | "confirmed"
      | "declined"
      | "cancelled"
      | "refunded";
    transactionId?: string;
    amount?: number;
    currency?: string;
    paymentMethod?: string;
  };
  error?: string;
}

export interface WebhookPayload {
  transaction: {
    id: number;
    uuid: string;
    status:
      | "waiting"
      | "authorized"
      | "confirmed"
      | "declined"
      | "cancelled"
      | "refunded";
    time: string;
    amount: number;
    currency: string;
    payment?: {
      brand: string;
      type: string;
    };
  };
  invoice?: {
    paymentRequestId: number;
    referenceId: string;
  };
}

export interface PayrexxGatewayPayload {
  title: string;
  description: string;
  amount: number;
  currency: string;
  referenceId: string;
  purpose: string;
  successRedirectUrl: string;
  failedRedirectUrl: string;
  cancelRedirectUrl: string;
  fields?: {
    email?: { value: string; required: boolean };
    forename?: { value: string; required: boolean };
    surname?: { value: string; required: boolean };
  };
  customFields?: Record<string, any>;
}

export interface PayrexxGatewayResponse {
  status: "success" | "error";
  data?: Array<{
    id: number;
    hash: string;
    link: string;
    qrlink: string;
  }>;
  message?: string;
}

export type DonationStatus = "idle" | "pending" | "success" | "failed";
