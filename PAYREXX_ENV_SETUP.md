# Payrexx Payment Gateway Integration - Environment Variables

## Required Variables

Copy these to your `.env.local` file and fill in your actual values:

```env
# ===================================
# Payrexx Payment Gateway Configuration
# ===================================

# Payrexx Instance Name
# Get this from your Payrexx dashboard
PAYREXX_INSTANCE=your-instance-name

# Payrexx API Secret Key
# Get this from your Payrexx dashboard under API settings
PAYREXX_API_SECRET=your-api-secret-key

# Payrexx API Base URL
# Default: https://api.payrexx.com/v1.0
# Test environment might use different URL
PAYREXX_API_BASE_URL=https://api.payrexx.com/v1.0

# ===================================
# Application URLs
# ===================================

# Public base URL for your Next.js application
# Used for payment redirect URLs
# Development: http://localhost:3000
# Production: https://yourdomain.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ===================================
# Payment Configuration
# ===================================

# Default currency for payments (ISO 4217 code)
# Supported: CHF, USD, EUR, GBP, CAD
DEFAULT_CURRENCY=CHF

# Payment timeout in milliseconds (1 hour = 3600000)
PAYMENT_TIMEOUT=3600000

# ===================================
# Webhook Configuration
# ===================================

# Webhook secret for signature verification
# Generate a secure random string
# Example: openssl rand -base64 32
WEBHOOK_SECRET=your-webhook-secret-key

# ===================================
# Environment
# ===================================

# Node environment
NODE_ENV=development
```

## Getting Started

1. **Sign up for Payrexx**: Visit [payrexx.com](https://payrexx.com) to create an account
2. **Get API Credentials**: Go to Settings → API and copy your instance name and API secret
3. **Create .env.local**: Create this file in your frontend root and add the variables above
4. **Test the integration**: Use test credentials first, then switch to production

## Testing

### Test Credentials

- Use your test instance provided by Payrexx
- Test card number: `4242 4242 4242 4242`
- CVV: Any 3 digits
- Expiry: Any future date

### Webhook Testing

For local webhook testing, use ngrok:

```bash
npx ngrok http 3000
```

Then update the webhook URL in Payrexx dashboard to:

```
https://your-ngrok-url.ngrok.io/api/payment/webhook
```

## Production Deployment

1. Replace test credentials with production credentials
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Configure production webhook URL in Payrexx dashboard
4. Test thoroughly before going live
