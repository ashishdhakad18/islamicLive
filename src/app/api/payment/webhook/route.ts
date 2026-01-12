import { NextRequest, NextResponse } from "next/server";
import type { WebhookPayload } from "@/types/payment.types";

export async function POST(request: NextRequest) {
  try {
    // Parse webhook payload
    const webhookData: WebhookPayload = await request.json();

    console.log("==================================================");
    console.log("Payrexx Webhook Received:", new Date().toISOString());
    console.log("Payload:", JSON.stringify(webhookData, null, 2));
    console.log("==================================================");

    // Extract transaction info
    const { transaction, invoice } = webhookData;

    if (!transaction) {
      console.error("Invalid webhook: Missing transaction data");
      return NextResponse.json(
        { success: false, error: "Invalid webhook data" },
        { status: 400 }
      );
    }

    // Process based on transaction status
    switch (transaction.status) {
      case "confirmed":
        console.log(`✅ Payment CONFIRMED - Transaction ID: ${transaction.id}`);
        console.log(
          `   Amount: ${transaction.currency} ${transaction.amount / 100}`
        );
        console.log(`   Reference: ${invoice?.referenceId}`);

        // TODO: Save to database
        // TODO: Send confirmation email
        // TODO: Update donation record
        // await saveDonationToDatabase(webhookData);
        // await sendConfirmationEmail(webhookData);
        break;

      case "declined":
        console.log(`❌ Payment DECLINED - Transaction ID: ${transaction.id}`);
        // TODO: Update donation status to failed
        break;

      case "cancelled":
        console.log(
          `⚠️  Payment CANCELLED - Transaction ID: ${transaction.id}`
        );
        // TODO: Update donation status to cancelled
        break;

      case "authorized":
        console.log(
          `🔄 Payment AUTHORIZED - Transaction ID: ${transaction.id}`
        );
        // TODO: Update donation status to pending
        break;

      case "waiting":
        console.log(`⏳ Payment WAITING - Transaction ID: ${transaction.id}`);
        break;

      case "refunded":
        console.log(`💰 Payment REFUNDED - Transaction ID: ${transaction.id}`);
        // TODO: Handle refund
        break;

      default:
        console.log(`ℹ️  Unknown status: ${transaction.status}`);
    }

    // Acknowledge webhook receipt
    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    console.error("Webhook Processing Error:", error);

    // Still return 200 to acknowledge receipt (Payrexx will retry otherwise)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        received: true,
      },
      { status: 200 }
    );
  }
}

// Optional: Verify webhook signature (if Payrexx provides it)
function verifyWebhookSignature(payload: any, signature: string): boolean {
  // TODO: Implement signature verification if needed
  // const expectedSignature = generateSignature(payload);
  // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  return true;
}
