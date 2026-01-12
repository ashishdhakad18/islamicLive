# Payrexx Payment Gateway Integration Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Backend Implementation](#backend-implementation)
6. [API Endpoints](#api-endpoints)
7. [Frontend Integration](#frontend-integration)
8. [Webhook Configuration](#webhook-configuration)
9. [Testing](#testing)
10. [Security Best Practices](#security-best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides complete implementation details for integrating Payrexx payment gateway into a MERN stack application. Payrexx is a Swiss payment service provider that supports multiple payment methods including credit cards, PayPal, TWINT, and more.

**Integration Methods:**
- **Gateway API** (Recommended): Full checkout flow with payment form
- **Paylink API**: Simple payment links for invoices

**Key Features:**
- Multiple payment methods
- Secure PCI-compliant payments
- Webhook notifications
- Refund support
- Multi-currency support

---

## Prerequisites

### Required Accounts & Credentials
1. **Payrexx Account**: Sign up at [payrexx.com](https://payrexx.com)
2. **API Credentials**: Obtain from Payrexx Dashboard
   - Instance Name (e.g., "demo")
   - API Secret Key

### Tech Stack Requirements
- **Backend**: Node.js 14+, Express.js
- **Database**: MongoDB
- **Frontend**: React 16.8+ (with Hooks)
- **Dependencies**: 
  - axios
  - crypto (Node.js built-in)
  - dotenv
  - express
  - mongoose

### Environment Setup
```bash
Node.js: v14.0.0 or higher
npm: v6.0.0 or higher
MongoDB: v4.0 or higher
```

---

## Project Structure

```
your-project/
├── backend/
│   ├── config/
│   │   └── payrexx.config.js       # Payrexx configuration
│   ├── controllers/
│   │   └── paymentController.js    # Payment business logic
│   ├── middleware/
│   │   ├── auth.js                 # Authentication middleware
│   │   └── validatePayment.js      # Payment validation
│   ├── models/
│   │   ├── Order.js                # Order schema
│   │   └── Transaction.js          # Transaction schema
│   ├── routes/
│   │   └── payment.routes.js       # Payment routes
│   ├── services/
│   │   └── payrexx.service.js      # Payrexx API wrapper
│   ├── utils/
│   │   ├── logger.js               # Logging utility
│   │   └── validators.js           # Input validators
│   ├── .env                        # Environment variables
│   ├── .env.example                # Environment template
│   └── server.js                   # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PaymentButton.jsx
│   │   │   ├── PaymentModal.jsx
│   │   │   └── PaymentStatus.jsx
│   │   ├── services/
│   │   │   └── payment.service.js
│   │   └── pages/
│   │       ├── Checkout.jsx
│   │       ├── PaymentSuccess.jsx
│   │       ├── PaymentFailed.jsx
│   │       └── PaymentCancel.jsx
│
└── README.md
```

---

## Installation & Setup

### 1. Install Dependencies

```bash
# Backend dependencies
cd backend
npm install express mongoose dotenv axios cors helmet express-rate-limit

# Frontend dependencies (if needed)
cd ../frontend
npm install axios
```

### 2. Environment Configuration

Create `.env` file in backend root:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/your-database

# Payrexx Configuration
PAYREXX_INSTANCE=your-instance-name
PAYREXX_API_SECRET=your-api-secret-key

# Payrexx API Base URL
PAYREXX_API_BASE_URL=https://api.payrexx.com/v1.0

# Webhook Secret (Generate a random secure string)
WEBHOOK_SECRET=your-webhook-secret-key

# Payment Configuration
DEFAULT_CURRENCY=USD
PAYMENT_TIMEOUT=3600000
```

Create `.env.example` for documentation:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/your-database

# Payrexx Configuration
PAYREXX_INSTANCE=
PAYREXX_API_SECRET=

# Payrexx API Base URL
PAYREXX_API_BASE_URL=https://api.payrexx.com/v1.0

# Webhook Secret
WEBHOOK_SECRET=

# Payment Configuration
DEFAULT_CURRENCY=USD
PAYMENT_TIMEOUT=3600000
```

---

## Backend Implementation

### 1. Payrexx Configuration (`config/payrexx.config.js`)

```javascript
module.exports = {
  instance: process.env.PAYREXX_INSTANCE,
  apiSecret: process.env.PAYREXX_API_SECRET,
  baseURL: process.env.PAYREXX_API_BASE_URL || 'https://api.payrexx.com/v1.0',
  
  // Payment settings
  defaultCurrency: process.env.DEFAULT_CURRENCY || 'USD',
  timeout: parseInt(process.env.PAYMENT_TIMEOUT) || 3600000, // 1 hour
  
  // Supported currencies
  supportedCurrencies: ['USD', 'EUR', 'GBP', 'CHF', 'CAD'],
  
  // Payment methods
  paymentMethods: [
    'mastercard',
    'visa',
    'amex',
    'paypal',
    'twint',
    'postfinance'
  ],
  
  // Webhook configuration
  webhookSecret: process.env.WEBHOOK_SECRET,
  
  // Redirect URLs
  getRedirectUrls: (frontendUrl = process.env.FRONTEND_URL) => ({
    success: `${frontendUrl}/payment/success`,
    failed: `${frontendUrl}/payment/failed`,
    cancel: `${frontendUrl}/payment/cancel`
  })
};
```

### 2. Payrexx Service (`services/payrexx.service.js`)

```javascript
const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/payrexx.config');

class PayrexxService {
  constructor() {
    this.instance = config.instance;
    this.apiSecret = config.apiSecret;
    this.baseURL = config.baseURL;
    
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiSecret
      },
      params: {
        instance: this.instance
      }
    });

    // Add retry logic
    this.api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        // Retry on rate limit (405, 403)
        if ([405, 403].includes(error.response?.status) && !originalRequest._retry) {
          originalRequest._retry = true;
          await this.delay(2000); // Wait 2 seconds
          return this.api(originalRequest);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Delay utility for rate limiting
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate HMAC signature for enhanced security
   */
  generateSignature(data) {
    const queryString = this.buildQueryString(data);
    const hmac = crypto.createHmac('sha256', this.apiSecret);
    hmac.update(queryString);
    return hmac.digest('base64');
  }

  /**
   * Build query string from object
   */
  buildQueryString(params) {
    return Object.keys(params)
      .sort()
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  /**
   * Validate currency
   */
  validateCurrency(currency) {
    if (!config.supportedCurrencies.includes(currency)) {
      throw new Error(`Unsupported currency: ${currency}`);
    }
  }

  /**
   * Convert amount to cents
   */
  toCents(amount) {
    return Math.round(parseFloat(amount) * 100);
  }

  /**
   * Convert cents to amount
   */
  fromCents(cents) {
    return parseFloat(cents) / 100;
  }

  /**
   * Create a payment gateway
   * @param {Object} gatewayData - Gateway configuration
   * @returns {Promise<Object>} - Gateway creation response
   */
  async createGateway(gatewayData) {
    try {
      const {
        amount,
        currency = config.defaultCurrency,
        referenceId,
        title,
        description,
        customerEmail,
        customerName,
        successUrl,
        failedUrl,
        cancelUrl,
        metadata = {}
      } = gatewayData;

      // Validate currency
      this.validateCurrency(currency);

      // Build gateway payload
      const payload = {
        title: title || 'Payment',
        description: description || '',
        amount: this.toCents(amount),
        currency: currency,
        referenceId: referenceId,
        purpose: `Order: ${referenceId}`,
        
        // Redirect URLs
        successRedirectUrl: successUrl || config.getRedirectUrls().success,
        failedRedirectUrl: failedUrl || config.getRedirectUrls().failed,
        cancelRedirectUrl: cancelUrl || config.getRedirectUrls().cancel,
        
        // Customer information
        ...(customerEmail && {
          fields: {
            email: {
              value: customerEmail,
              required: true
            },
            ...(customerName && {
              forename: {
                value: customerName.split(' ')[0],
                required: false
              },
              surname: {
                value: customerName.split(' ').slice(1).join(' '),
                required: false
              }
            })
          }
        }),

        // Additional metadata
        customFields: metadata
      };

      const response = await this.api.post('/Gateway/', payload);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          gatewayId: response.data.data[0].id,
          hash: response.data.data[0].hash,
          link: response.data.data[0].link,
          qrLink: response.data.data[0].qrlink
        };
      }

      throw new Error(response.data.message || 'Gateway creation failed');
    } catch (error) {
      console.error('Payrexx Gateway Creation Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to create payment gateway'
      );
    }
  }

  /**
   * Get gateway details
   * @param {number} gatewayId - Gateway ID
   * @returns {Promise<Object>} - Gateway details
   */
  async getGateway(gatewayId) {
    try {
      const response = await this.api.get(`/Gateway/${gatewayId}`);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          data: response.data.data[0]
        };
      }

      throw new Error(response.data.message || 'Failed to fetch gateway');
    } catch (error) {
      console.error('Payrexx Get Gateway Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch gateway details'
      );
    }
  }

  /**
   * Get transaction details
   * @param {number} transactionId - Transaction ID
   * @returns {Promise<Object>} - Transaction details
   */
  async getTransaction(transactionId) {
    try {
      const response = await this.api.get(`/Transaction/${transactionId}`);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          data: response.data.data[0]
        };
      }

      throw new Error(response.data.message || 'Failed to fetch transaction');
    } catch (error) {
      console.error('Payrexx Get Transaction Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch transaction details'
      );
    }
  }

  /**
   * Cancel a gateway
   * @param {number} gatewayId - Gateway ID
   * @returns {Promise<Object>} - Cancellation response
   */
  async cancelGateway(gatewayId) {
    try {
      const response = await this.api.delete(`/Gateway/${gatewayId}`);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          message: 'Gateway cancelled successfully'
        };
      }

      throw new Error(response.data.message || 'Failed to cancel gateway');
    } catch (error) {
      console.error('Payrexx Cancel Gateway Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to cancel gateway'
      );
    }
  }

  /**
   * Process refund
   * @param {number} transactionId - Transaction ID
   * @param {number} amount - Refund amount
   * @returns {Promise<Object>} - Refund response
   */
  async refundTransaction(transactionId, amount) {
    try {
      const payload = {
        amount: this.toCents(amount)
      };

      const response = await this.api.post(
        `/Transaction/${transactionId}/refund`,
        payload
      );
      
      if (response.data.status === 'success') {
        return {
          success: true,
          refundId: response.data.data[0].id,
          message: 'Refund processed successfully'
        };
      }

      throw new Error(response.data.message || 'Refund failed');
    } catch (error) {
      console.error('Payrexx Refund Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to process refund'
      );
    }
  }

  /**
   * Verify webhook signature
   * @param {Object} payload - Webhook payload
   * @param {string} signature - Received signature
   * @returns {boolean} - Verification result
   */
  verifyWebhookSignature(payload, signature) {
    const expectedSignature = this.generateSignature(payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}

module.exports = new PayrexxService();
```

### 3. Database Models

**Order Model (`models/Order.js`)**

```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: String,
  paymentGatewayId: String,
  transactionId: String,
  customerInfo: {
    email: String,
    name: String,
    phone: String,
    address: Object
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
```

**Transaction Model (`models/Transaction.js`)**

```javascript
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  gatewayId: {
    type: String,
    required: true
  },
  transactionId: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'authorized', 'confirmed', 'declined', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentMethod: String,
  gatewayHash: String,
  // paymentLink: String,
  paidAt: Date,
  refundedAt: Date,
  refundAmount: Number,
  errorMessage: String,
  webhookData: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
```

### 4. Payment Controller (`controllers/paymentController.js`)

```javascript
const payrexxService = require('../services/payrexx.service');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

/**
 * Create a payment gateway
 */
exports.createPayment = async (req, res) => {
  try {
    const {
      orderId,
      amount,
      currency,
      customerEmail,
      customerName
    } = req.body;

    // Validate required fields
    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Order ID and amount are required'
      });
    }

    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if order is already paid
    if (order.paymentStatus === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Order is already paid'
      });
    }

    // Create gateway
    const gatewayData = {
      amount: amount || order.totalAmount,
      currency: currency || order.currency,
      referenceId: order.orderNumber,
      title: `Payment for Order ${order.orderNumber}`,
      description: `Order payment - ${order.items.length} item(s)`,
      customerEmail: customerEmail || order.customerInfo?.email,
      customerName: customerName || order.customerInfo?.name,
      metadata: {
        orderId: order._id.toString(),
        userId: order.userId.toString()
      }
    };

    const gateway = await payrexxService.createGateway(gatewayData);

    // Create transaction record
    const transaction = await Transaction.create({
      orderId: order._id,
      gatewayId: gateway.gatewayId,
      amount: gatewayData.amount,
      currency: gatewayData.currency,
      status: 'pending',
      gatewayHash: gateway.hash,
      // paymentLink: gateway.link
    });

    // Update order
    order.paymentStatus = 'processing';
    order.paymentGatewayId = gateway.gatewayId;
    await order.save();

    res.json({
      success: true,
      data: {
        gatewayId: gateway.gatewayId,
        gatewayHash: gateway.hash,
        // paymentLink: gateway.link,
        qrLink: gateway.qrLink,
        transactionId: transaction._id
      }
    });

  } catch (error) {
    console.error('Create Payment Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create payment'
    });
  }
};

/**
 * Get payment status
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { gatewayId } = req.params;

    if (!gatewayId) {
      return res.status(400).json({
        success: false,
        error: 'Gateway ID is required'
      });
    }

    // Get gateway details from Payrexx
    const gatewayDetails = await payrexxService.getGateway(gatewayId);

    // Find transaction in database
    const transaction = await Transaction.findOne({ gatewayId })
      .populate('orderId');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: {
        transaction: transaction,
        gatewayDetails: gatewayDetails.data
      }
    });

  } catch (error) {
    console.error('Get Payment Status Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch payment status'
    });
  }
};

/**
 * Handle webhook notifications
 */
exports.handleWebhook = async (req, res) => {
  try {
    const webhookData = req.body;
    
    console.log('Webhook received:', JSON.stringify(webhookData, null, 2));

    // Extract transaction info
    const {
      transaction: txData,
      invoice
    } = webhookData;

    if (!txData) {
      return res.status(400).json({ error: 'Invalid webhook data' });
    }

    // Find transaction by gateway ID
    const transaction = await Transaction.findOne({
      gatewayId: invoice?.paymentRequestId
    }).populate('orderId');

    if (!transaction) {
      console.error('Transaction not found for gateway:', invoice?.paymentRequestId);
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Update transaction status
    transaction.status = this.mapPayrexxStatus(txData.status);
    transaction.transactionId = txData.id;
    transaction.paymentMethod = txData.payment?.brand;
    transaction.webhookData = new Map(Object.entries(webhookData));

    if (txData.status === 'confirmed') {
      transaction.paidAt = new Date();
    }

    await transaction.save();

    // Update order
    const order = transaction.orderId;
    if (txData.status === 'confirmed') {
      order.paymentStatus = 'completed';
      order.transactionId = txData.id;
      order.paymentMethod = txData.payment?.brand;
    } else if (txData.status === 'declined') {
      order.paymentStatus = 'failed';
    } else if (txData.status === 'cancelled') {
      order.paymentStatus = 'cancelled';
    }

    await order.save();

    // Send confirmation email, update inventory, etc.
    // await sendOrderConfirmation(order);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Map Payrexx status to internal status
 */
exports.mapPayrexxStatus = (payrexxStatus) => {
  const statusMap = {
    'waiting': 'pending',
    'authorized': 'authorized',
    'confirmed': 'confirmed',
    'declined': 'declined',
    'cancelled': 'cancelled',
    'refunded': 'refunded'
  };

  return statusMap[payrexxStatus] || 'pending';
};

/**
 * Cancel payment
 */
exports.cancelPayment = async (req, res) => {
  try {
    const { gatewayId } = req.params;

    // Find transaction
    const transaction = await Transaction.findOne({ gatewayId })
      .populate('orderId');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    // Cancel gateway at Payrexx
    await payrexxService.cancelGateway(gatewayId);

    // Update transaction
    transaction.status = 'cancelled';
    await transaction.save();

    // Update order
    transaction.orderId.paymentStatus = 'cancelled';
    await transaction.orderId.save();

    res.json({
      success: true,
      message: 'Payment cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel Payment Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to cancel payment'
    });
  }
};

/**
 * Process refund
 */
exports.refundPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { amount, reason } = req.body;

    // Find transaction
    const transaction = await Transaction.findById(transactionId)
      .populate('orderId');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    if (!transaction.transactionId) {
      return res.status(400).json({
        success: false,
        error: 'No Payrexx transaction ID found'
      });
    }

    // Process refund at Payrexx
    const refundAmount = amount || transaction.amount;
    const refundResult = await payrexxService.refundTransaction(
      transaction.transactionId,
      refundAmount
    );

    // Update transaction
    transaction.status = 'refunded';
    transaction.refundedAt = new Date();
    transaction.refundAmount = refundAmount;
    await transaction.save();

    // Update order
    transaction.orderId.paymentStatus = 'refunded';
    await transaction.orderId.save();

    res.json({
      success: true,
      data: refundResult
    });

  } catch (error) {
    console.error('Refund Payment Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process refund'
    });
  }
};
```

### 5. Payment Routes (`routes/payment.routes.js`)

```javascript
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');
const { validatePayment } = require('../middleware/validatePayment');

// Create payment gateway
router.post(
  '/create',
  authenticate,
  validatePayment,
  paymentController.createPayment
);

// Get payment status
router.get(
  '/status/:gatewayId',
  authenticate,
  paymentController.getPaymentStatus
);

// Webhook endpoint (no auth required - validated by Payrexx)
router.post(
  '/webhook',
  paymentController.handleWebhook
);

// Cancel payment
router.post(
  '/cancel/:gatewayId',
  authenticate,
  paymentController.cancelPayment
);

// Refund payment
router.post(
  '/refund/:transactionId',
  authenticate,
  paymentController.refundPayment
);

module.exports = router;
```

### 6. Middleware

**Authentication Middleware (`middleware/auth.js`)**

```javascript
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};
```

**Payment Validation Middleware (`middleware/validatePayment.js`)**

```javascript
exports.validatePayment = (req, res, next) => {
  const { orderId, amount } = req.body;

  const errors = [];

  if (!orderId) {
    errors.push('Order ID is required');
  }

  if (!amount || amount <= 0) {
    errors.push('Valid amount is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};
```

### 7. Server Setup (`server.js`)

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const paymentRoutes = require('./routes/payment.routes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;