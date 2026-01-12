// Payment utility functions

/**
 * Convert amount to cents (Payrexx expects amounts in cents)
 */
export function toCents(amount: number): number {
  return Math.round(parseFloat(amount.toString()) * 100);
}

/**
 * Convert cents to amount
 */
export function fromCents(cents: number): number {
  return parseFloat(cents.toString()) / 100;
}

/**
 * Validate currency code
 */
export function validateCurrency(currency: string): boolean {
  const supportedCurrencies = ["USD", "EUR", "GBP", "CHF", "CAD"];
  return supportedCurrencies.includes(currency.toUpperCase());
}

/**
 * Generate unique reference ID for donation
 */
export function generateReferenceId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DON-${timestamp}-${random}`;
}

/**
 * Format currency amount for display
 */
export function formatCurrency(
  amount: number,
  currency: string = "CHF"
): string {
  return new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

/**
 * Build redirect URLs with referenceId
 */
export function getRedirectUrls(baseUrl: string, referenceId?: string) {
  const refParam = referenceId ? `&ref=${referenceId}` : "";
  return {
    success: `${baseUrl}/en/donate?status=success${refParam}`,
    failed: `${baseUrl}/en/donate?status=failed${refParam}`,
    cancel: `${baseUrl}/en/donate?status=cancel${refParam}`,
  };
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

/**
 * Validate payment amount
 */
export function validateAmount(amount: number): {
  valid: boolean;
  error?: string;
} {
  if (isNaN(amount) || amount <= 0) {
    return { valid: false, error: "Amount must be greater than 0" };
  }

  if (amount < 5) {
    return { valid: false, error: "Minimum donation amount is CHF 5" };
  }

  if (amount > 50000) {
    return { valid: false, error: "Maximum donation amount is CHF 50,000" };
  }

  return { valid: true };
}

/**
 * Sanitize user input for API
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}
