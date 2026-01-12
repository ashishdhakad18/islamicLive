# Donation Flow - Complete Technical Documentation

This document provides a comprehensive overview of the donation flow implementation, including all steps, validations, navigation logic, state management, and user interactions.

---

## Table of Contents

1. [Flow Overview](#flow-overview)
2. [Redux State Architecture](#redux-state-architecture)
3. [Step-by-Step Flow Details](#step-by-step-flow-details)
4. [Validation System](#validation-system)
5. [Navigation Logic](#navigation-logic)
6. [Payment Integration](#payment-integration)
7. [Data Persistence](#data-persistence)

---

## Flow Overview

The donation flow consists of **6 main steps**:

1. **Intro** - Introduction to the donation process
2. **Frequency** - Select donation frequency (one-time or monthly)
3. **Funds & Amount** - Select causes and donation amounts
4. **Details** - Enter contact information
5. **Review** - Review donation and select payment method
6. **Status** - Display donation result (success/failed/pending)

### Visual Flow Diagram

```
Intro → Frequency → Funds & Amount → Details → Review → Payment Gateway → Status
  ↓         ↓             ↓              ↓         ↓                          ↓
[Skip]   [Select]    [Add to Cart]   [Form]   [Select]                  [Result]
```

---

## Redux State Architecture

### Donation Slice (`donationSlice.ts`)

The donation flow uses two Redux slices:
- **`donationSlice`** - Manages flow-specific state
- **`cartSlice`** - Manages selected causes and amounts

#### Donation State Structure

```typescript
interface DonationState {
  // Flow control
  currentStep: DonationStep;  // 'intro' | 'frequency' | 'funds' | 'details' | 'review' | 'status'
  frequency: DonationFrequency;  // 'one-time' | 'monthly' | ''
  status: 'idle' | 'pending' | 'success' | 'failed';
  
  // User data
  userDetails: Record<string, any>;  // Contact form data
  
  // Temporary selection state
  currentFundsSelection: {
    causeId: string | null;
    amount: number | null;
    customAmount: string;
  };
  
  // Donation summary
  lastDonationSummary: {
    items: any[];
    frequency?: DonationFrequency;
    totalAmount: number;
    transactionId?: string;
  } | null;
  
  // Validation & error handling
  validationErrors: ValidationError[];
  isLoading: boolean;
  error: string | null;
  
  // Auto-save functionality
  isDraftSaved: boolean;
  lastSavedAt: string | null;
  sessionId: string | null;
}
```

#### Key Actions

| Action | Purpose | When Used |
|--------|---------|-----------|
| `setStep(step)` | Navigate between steps | All navigation |
| `setFrequency(freq)` | Set donation frequency | Frequency step |
| `updateUserDetails(data)` | Update contact details | Details step |
| `updateFundsSelection(data)` | Update temporary cause/amount selection | Funds step |
| `clearFundsSelection()` | Clear temporary selection | After adding to cart |
| `setDonationStatus(status)` | Set donation result status | After payment |
| `setLastDonationSummary(summary)` | Store donation summary | Before payment |
| `resetDonation()` | Clear all state | Start new donation |
| `saveDonationDraft(data)` | Auto-save progress | Details step |
| `processDonation(data)` | Process payment | Review step |

#### Cart State Structure

```typescript
interface CartState {
  items: CartItem[];  // Array of selected causes
  totalAmount: number;  // Calculated total
}

interface CartItem {
  id: string;
  causeId: string;
  name: string;
  amount: number;
}
```

---

## Step-by-Step Flow Details

### Step 0: Intro (`IntroStep.tsx`)

**Purpose**: Welcome screen explaining the donation process

**UI Elements**:
- Title: "MAKE A DIFFERENCE TODAY"
- Description of donation impact
- 4 visual cards showing the flow steps:
  - Frequency
  - Funds & Amount
  - Details
  - Review

**Navigation**:
- **Next**: "Start Donation" button → Goes to `frequency` step
- **Back**: Not available

**State Changes**: None

**Validations**: None

---

### Step 1: Frequency (`FrequencyStep.tsx`)

**Purpose**: Select how often the user wants to donate

**UI Elements**:
- Title: "SELECT FREQUENCY"
- Two selection cards:
  - **One-Time Donation**: "Make a single, impactful contribution"
  - **Monthly Giving**: "Provide ongoing support every month"

**User Interactions**:
1. Click on a frequency card
2. Selected card highlights with:
   - Primary border color
   - Light background
   - Ring effect
   - Icon changes to primary color

**State Changes**:
```typescript
dispatch(setFrequency('one-time' | 'monthly'))
```

**Navigation**:
- **Back**: Returns to `intro` step
- **Next**: "CONTINUE" button (enabled only when frequency is selected)

**Validations**:
- Must select a frequency before continuing
- Navigation button disabled until selection is made

**Redux Selector**:
```typescript
const frequency = useAppSelector((state) => state.donation.frequency);
```

---

### Step 2: Funds & Amount (`FundsAmountStep.tsx`)

**Purpose**: Select causes to support and specify donation amounts

**UI Elements**:
- Title: "SELECT FUNDS & AMOUNT"
- Grid of cause cards (from `donationCauses.ts`)
- "SEE ALL ACTIONS" button (opens modal with all causes)
- Amount selection section (appears when cause is selected):
  - Preset amount buttons ($5, $10, $25, $50, $100)
  - Custom amount input field
  - "ADD TO CART" button

**User Interactions**:

1. **Select a Cause**:
   - Click on a cause card
   - Card highlights with primary border
   - Amount selection section appears
   - Double-click or click again to deselect

2. **Select Amount**:
   - Click preset amount button, OR
   - Enter custom amount in input field
   - Real-time validation displays errors

3. **Add to Cart**:
   - Click "ADD TO CART" button
   - Item added to cart
   - Selection cleared
   - Can add multiple causes

4. **View All Causes**:
   - Click "SEE ALL ACTIONS"
   - Modal opens with complete cause list
   - Can select from modal

**State Management**:

```typescript
// Temporary selection (before adding to cart)
const { causeId, amount, customAmount } = useAppSelector(
  (state) => state.donation.currentFundsSelection
);

// Cart items
const { items: cartItems, totalAmount } = useAppSelector(
  (state) => state.cart
);
```

**State Changes**:

```typescript
// Update temporary selection
dispatch(updateFundsSelection({ causeId: 'cause-id' }));
dispatch(updateFundsSelection({ amount: 50 }));
dispatch(updateFundsSelection({ customAmount: '75.50', amount: null }));

// Add to cart
dispatch(addItem({
  id: Math.random().toString(36).substr(2, 9),
  causeId: selectedCause.id,
  name: selectedCause.name,
  amount: finalAmount
}));

// Clear temporary selection
dispatch(clearFundsSelection());
```

**Validations**:

1. **Amount Validation** (`validateDonationAmount`):
   - Must be a valid number
   - Minimum: CHF 5
   - Maximum: CHF 50,000
   - Real-time validation on input change

2. **Custom Amount Input**:
   - Only numbers and decimal point allowed
   - Maximum 2 decimal places
   - No multiple decimal points

3. **Add to Cart Validation**:
   - Cause must be selected
   - Amount must be valid
   - Error displayed if validation fails

**Navigation**:
- **Back**: Returns to `frequency` step
- **Next**: "CONTINUE" button
  - Enabled when: `cartItems.length > 0` OR valid selection exists
  - If valid selection exists but not in cart, automatically adds to cart on continue

**Special Features**:
- Causes already in cart are highlighted differently
- Can remove items from cart (trash icon)
- Cart summary shows total amount
- Double-click deselection for better UX

---

### Step 3: Details (`ContactDetailsStep.tsx`)

**Purpose**: Collect user contact information

**UI Elements**:
- Title: "LOGIN DETAILS"
- Dynamic form fields from `donationSchema.ts`:
  - Civility (dropdown: Mme/M.)
  - Full Name
  - Email
  - Phone Number
  - Address
  - City
  - Country (dropdown)
  - Postal Code

**Form Implementation**:

Uses `react-hook-form` for form management:

```typescript
const { register, handleSubmit, watch, setValue, formState: { errors, isValid, isDirty } } = useForm({
  defaultValues: userDetails,  // Pre-fill from Redux
  mode: 'onChange'  // Validate on change
});
```

**User Interactions**:

1. **Fill Form Fields**:
   - Type in text inputs
   - Select from dropdowns
   - Real-time validation
   - Error messages display below fields

2. **Auto-Save**:
   - Form data auto-saves to Redux after 500ms of inactivity
   - Also saves to localStorage as backup
   - Saving indicator shows status

**State Changes**:

```typescript
// Auto-save (every 500ms after changes)
dispatch(updateUserDetails(watchedValues));
dispatch(saveDonationDraft({
  userDetails: watchedValues,
  currentStep: 'details'
}));

// On form submit
dispatch(updateUserDetails(data));
dispatch(setStep('review'));
```

**Validations**:

All fields use `react-hook-form` validation based on `donationSchema.ts`:

| Field | Validation Rules |
|-------|-----------------|
| Civility | Required |
| Full Name | Required, 2-50 chars, letters/spaces/hyphens only |
| Email | Required, valid email format, max 100 chars |
| Phone | Required, valid phone format (international) |
| Address | Required, 5-200 chars |
| City | Required, 2-50 chars, letters/spaces/hyphens only |
| Country | Required, select from dropdown |
| Postal Code | Required, 3-10 alphanumeric chars |

**Navigation**:
- **Back**: Returns to `funds` step (saves current progress first)
- **Next**: "CONTINUE TO REVIEW" button
  - Type: `submit` (triggers form validation)
  - Enabled only when form is valid (`isValid`)
  - Handled by `DonationNavigation` component

**Special Features**:
- Form data persists when navigating back/forward
- Auto-save functionality prevents data loss
- Validation errors clear when field is corrected
- Pre-fills from Redux state on mount

---

### Step 4: Review (`ReviewPaymentStep.tsx`)

**Purpose**: Review donation summary and select payment method

**UI Elements**:

**Left Side - Payment Methods**:
- 4 payment method buttons:
  - Payrexx (default selected)
  - Postfinance
  - Mastercard
  - TWINT
- Each shows icon and name
- Selected method highlighted

**Right Side - Donation Summary**:
- "Summary of your donation"
- List of all cart items with amounts
- Total amount display

**User Interactions**:

1. **Select Payment Method**:
   - Click on payment method button
   - Selected method highlights with primary colors
   - Default: Payrexx

2. **Review Summary**:
   - View all selected causes
   - Verify amounts
   - Check total

**State Management**:

```typescript
const { userDetails, frequency, isLoading, error } = useAppSelector(
  (state) => state.donation
);
const { items: cartItems, totalAmount } = useAppSelector(
  (state) => state.cart
);
const [selectedMethod, setSelectedMethod] = useState('payrexx');
```

**Navigation**:
- **Back**: Returns to `details` step
- **Next**: "DONATE NOW" button
  - Triggers payment processing
  - Shows loading state during processing
  - Redirects to payment gateway

**Payment Processing Flow**:

When "DONATE NOW" is clicked:

1. **Save Donation Summary**:
```typescript
dispatch(setLastDonationSummary({
  items: cartItems.map(item => ({
    name: item.name,
    amount: item.amount
  })),
  frequency,
  totalAmount
}));
```

2. **Create Payment Gateway**:
```typescript
const paymentRequest = {
  amount: totalAmount,
  currency: 'CHF',
  donationData: {
    frequency: frequency || 'one-time',
    cartItems: [...],
    userDetails: {...}
  }
};

const response = await payrexxService.createGateway(paymentRequest);
```

3. **Redirect to Payment**:
```typescript
if (response.success && response.data?.hash) {
  payrexxService.redirectToPayment(response.data.hash);
}
```

4. **Handle Errors**:
```typescript
catch (error) {
  dispatch(setDonationStatus('failed'));
  dispatch(setStep('status'));
}
```

**Validations**:
- Payment method must be selected (default: Payrexx)
- Cart must have items
- Total amount must be > 0

---

### Step 5: Status (`StatusStep.tsx`)

**Purpose**: Display donation result after payment gateway returns

**UI Elements**:

Different UI based on status:

**Success Status**:
- Green background
- Success icon
- Title: "Donation Successful"
- Donation summary with all items
- Total amount
- Buttons:
  - "DONATE AGAIN" (secondary)
  - "GO TO HOME" (primary)
  - "DOWNLOAD RECEIPT" (ghost)

**Failed Status**:
- Red background
- Error icon
- Title: "Donation Failed"
- "TRY AGAIN" button → Returns to review step

**Pending Status**:
- Yellow background
- Pending icon
- Title: "Donation Pending"
- "GO TO HOME" button

**Payment Return Handling**:

The `DonationFlow.tsx` component handles payment gateway returns:

```typescript
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const paymentStatus = params.get('status');

  if (paymentStatus) {
    switch (paymentStatus) {
      case 'success':
        dispatch(setDonationStatus('success'));
        dispatch(setStep('status'));
        dispatch(clearCart());
        break;
      
      case 'failed':
        dispatch(setDonationStatus('failed'));
        dispatch(setStep('status'));
        break;
      
      case 'cancel':
        dispatch(setStep('review'));  // Return to review
        break;
    }
    
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
  }
}, [dispatch]);
```

**Navigation**:

Based on status:
- **Success**: 
  - "GO TO HOME" → Redirects to homepage
  - "DONATE AGAIN" → Resets flow to intro
- **Failed**: 
  - "TRY AGAIN" → Returns to review step
- **Pending**: 
  - "GO TO HOME" → Redirects to homepage

**State Changes**:

```typescript
// On success
dispatch(setDonationStatus('success'));
dispatch(clearCart());
dispatch(resetDonation());  // When starting new donation

// On failed
dispatch(setDonationStatus('failed'));
dispatch(setStep('review'));  // Try again
```

---

## Validation System

### Client-Side Validations

#### 1. Frequency Step
- **Rule**: Must select a frequency
- **Implementation**: Navigation button disabled until selection
- **Error**: Button remains disabled

#### 2. Funds & Amount Step

**Cause Selection**:
- **Rule**: Must select at least one cause
- **Implementation**: Continue button disabled if cart is empty AND no valid selection

**Amount Validation** (`validateDonationAmount`):
```typescript
export const validateDonationAmount = (amount: number | string): string | null => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount) || numAmount <= 0) {
    return 'Please enter a valid donation amount';
  }
  
  if (numAmount < 5) {
    return 'Minimum donation amount is CHF 5';
  }
  
  if (numAmount > 50000) {
    return 'Maximum donation amount is CHF 50,000';
  }
  
  return null;
};
```

**Custom Amount Input Validation**:
- Only numbers and decimal point allowed
- Maximum 2 decimal places
- No multiple decimal points
- Real-time validation with error display

#### 3. Details Step

Uses `react-hook-form` with validation schema:

```typescript
{
  civility: {
    required: 'Please select your civility'
  },
  fullName: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 50, message: 'Name must not exceed 50 characters' },
    pattern: { value: /^[a-zA-ZÀ-ÿ\s'-]+$/, message: 'Name contains invalid characters' }
  },
  email: {
    required: 'Email is required',
    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' },
    maxLength: { value: 100, message: 'Email must not exceed 100 characters' }
  },
  phone: {
    required: 'Phone number is required',
    pattern: { value: /^[\+]?[1-9][\d]{0,15}$/, message: 'Please enter a valid phone number' }
  },
  address: {
    required: 'Address is required',
    minLength: { value: 5, message: 'Address must be at least 5 characters' },
    maxLength: { value: 200, message: 'Address must not exceed 200 characters' }
  },
  city: {
    required: 'City is required',
    minLength: { value: 2, message: 'City must be at least 2 characters' },
    maxLength: { value: 50, message: 'City must not exceed 50 characters' },
    pattern: { value: /^[a-zA-ZÀ-ÿ\s'-]+$/, message: 'City contains invalid characters' }
  },
  country: {
    required: 'Please select your country'
  },
  postalCode: {
    required: 'Postal code is required',
    pattern: { value: /^[A-Z0-9\s-]{3,10}$/i, message: 'Please enter a valid postal code' }
  }
}
```

**Validation Behavior**:
- Real-time validation on field change
- Error messages display below fields
- Form submit disabled until all fields valid
- Errors clear when field is corrected

#### 4. Review Step
- Payment method selected (default: Payrexx)
- Cart has items
- Total amount > 0

---

## Navigation Logic

### Navigation Component (`DonationNavigation.tsx`)

Centralized navigation logic for all steps (except intro and status).

**Button States**:

| Step | Back Button | Next Button | Next Label |
|------|-------------|-------------|------------|
| Intro | Hidden | Enabled | "START DONATION" |
| Frequency | "GO BACK" | Disabled until selection | "CONTINUE" |
| Funds | "GO BACK" | Disabled if no cart items AND no valid selection | "CONTINUE" |
| Details | "GO BACK" | Submit form button, disabled if invalid | "CONTINUE" |
| Review | "GO BACK" | Enabled, shows loading during payment | "DONATE NOW" |
| Status | Hidden | Varies by status | Varies |

**Navigation Flow Logic**:

```typescript
const handleNext = async () => {
  switch (currentStep) {
    case 'intro':
      dispatch(setStep('frequency'));
      break;
      
    case 'frequency':
      dispatch(setStep('funds'));
      break;
      
    case 'funds':
      // Auto-add valid selection to cart if exists
      if (isFundsSelectionValid()) {
        dispatch(addItem({...}));
        dispatch(clearFundsSelection());
      }
      dispatch(setStep('details'));
      break;
      
    case 'details':
      // Handled by form submit
      dispatch(setStep('review'));
      break;
      
    case 'review':
      // Process payment
      await handlePaymentProcessing();
      break;
  }
};

const handleBack = () => {
  const steps = ['intro', 'frequency', 'funds', 'details', 'review', 'status'];
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex > 0) {
    dispatch(setStep(steps[currentIndex - 1]));
  }
};
```

**Special Navigation Cases**:

1. **Funds → Details**: 
   - If user has valid selection but hasn't clicked "Add to Cart"
   - Automatically adds to cart before proceeding

2. **Details Step**:
   - Next button is type="submit" for form
   - Triggers form validation
   - Only proceeds if form is valid

3. **Review → Payment**:
   - Shows loading state
   - Creates payment gateway
   - Redirects to external payment page
   - Returns to app via URL parameters

4. **Payment Return**:
   - Reads `?status=success|failed|cancel` from URL
   - Updates state accordingly
   - Cleans URL parameters

---

## Payment Integration

### Payrexx Integration

**Service**: `payrexxService.ts`

**Flow**:

1. **Create Gateway**:
```typescript
const response = await payrexxService.createGateway({
  amount: totalAmount,
  currency: 'CHF',
  donationData: {
    frequency,
    cartItems,
    userDetails
  }
});
```

2. **Redirect to Payment**:
```typescript
payrexxService.redirectToPayment(response.data.hash);
```

3. **Return Handling**:
```typescript
// User returns with URL: /donate?status=success
const params = new URLSearchParams(window.location.search);
const paymentStatus = params.get('status');
```

4. **Status Update**:
```typescript
if (paymentStatus === 'success') {
  dispatch(setDonationStatus('success'));
  dispatch(clearCart());
  dispatch(setStep('status'));
}
```

**Payment Methods Supported**:
- Payrexx (default)
- Postfinance
- Mastercard
- TWINT

### Webhook Transaction Status Handling

Payrexx sends webhook notifications with transaction status updates. The following table shows all possible status values and how they map to the app:

**Payrexx Transaction Status Values**:

| Payrexx Status | App Status | Description | Action |
|----------------|------------|-------------|--------|
| `waiting` | `pending` | Order placed, awaiting payment | Show pending UI |
| `confirmed` | `success` | ✅ Payment successful | Clear cart, show success, send confirmation |
| `cancelled` | `failed` | User cancelled payment | Return to review, allow retry |
| `declined` | `failed` | 3DS failed or issuer declined | Show error, allow retry |
| `authorized` | `pending` | Tokenization successful (recurring) | Wait for confirmation |
| `reserved` | `pending` | Amount reserved, not captured | Wait for capture |
| `refunded` | `failed` | Full refund processed | Update transaction record |
| `partially-refunded` | - | Partial refund | Update refund amount |
| `refund_pending` | `pending` | Refund being processed | Wait for completion |
| `chargeback` | - | Customer disputed payment | Flag for review |
| `error` | `failed` | Payment processing error | Show error, allow retry |

**Webhook Payload Structure**:

```typescript
interface PayrexxWebhookPayload {
  transaction: {
    id: number;              // Internal transaction ID
    uuid: string;            // Public transaction ID
    status: string;          // Transaction status (see above)
    time: string;            // ISO datetime of transaction
    amount: number;          // Amount in smallest currency unit
    lang: string;            // ISO 639-1 language code
    psp: string;             // Payment provider name
    pspId: number;           // Payment provider ID
    payrexxFee: number;      // Payrexx fee in smallest unit
    referenceId: string;     // Custom reference (donation ID)
    type: string;            // 'POS' or 'E-Commerce'
    
    payment: {
      brand: string;         // Card brand (visa, mastercard, etc.)
      wallet: string | null; // Wallet type if used
      cardholderName: string;
      cardNumber?: string;   // Truncated PAN
      expiry?: string;       // YY-MM format
    };
    
    contact: {
      // Customer contact info
    };
    
    invoice: {
      // Invoice details
    };
    
    metadata: {
      // Custom metadata passed during gateway creation
    };
  };
}
```

**Webhook Handler Implementation**:

```typescript
// API route: /api/webhooks/payrexx
export async function POST(request: Request) {
  const payload = await request.json();
  const { transaction } = payload;
  
  // Verify webhook signature (recommended)
  // const isValid = verifyPayrexxSignature(request.headers, payload);
  
  switch (transaction.status) {
    case 'confirmed':
      await handleSuccessfulPayment(transaction);
      break;
      
    case 'cancelled':
    case 'declined':
    case 'error':
      await handleFailedPayment(transaction);
      break;
      
    case 'waiting':
    case 'authorized':
    case 'reserved':
      await handlePendingPayment(transaction);
      break;
      
    case 'refunded':
    case 'partially-refunded':
      await handleRefund(transaction);
      break;
      
    case 'chargeback':
      await handleChargeback(transaction);
      break;
  }
  
  return Response.json({ received: true });
}
```

**Status Mapping Function**:

```typescript
const mapPayrexxStatusToAppStatus = (payrexxStatus: string): DonationStatus => {
  const statusMap: Record<string, DonationStatus> = {
    'confirmed': 'success',
    'cancelled': 'failed',
    'declined': 'failed',
    'error': 'failed',
    'waiting': 'pending',
    'authorized': 'pending',
    'reserved': 'pending',
    'refund_pending': 'pending',
    'refunded': 'failed',
    'partially-refunded': 'failed',
    'chargeback': 'failed'
  };
  
  return statusMap[payrexxStatus] || 'pending';
};
```

> **Note**: All amounts and fees in webhook payloads are provided in the smallest unit of the transaction currency (e.g., centimes for CHF).

---

## Data Persistence

### Auto-Save System

**Implementation**: `ContactDetailsStep.tsx`

```typescript
useEffect(() => {
  if (isDirty && !isLoading) {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    autoSaveTimerRef.current = setTimeout(() => {
      dispatch(updateUserDetails(watchedValues));
      dispatch(saveDonationDraft({
        userDetails: watchedValues,
        currentStep: 'details'
      }));
    }, 500);  // 500ms debounce
  }
}, [watchedValues, isDirty]);
```

**Features**:
- Auto-saves after 500ms of inactivity
- Saves to Redux state
- Saves to localStorage as backup
- Shows saving indicator
- Prevents data loss on navigation

### LocalStorage Backup

**Save**:
```typescript
localStorage.setItem('donationDraft', JSON.stringify({
  userDetails,
  frequency,
  currentStep,
  savedAt: new Date().toISOString()
}));
```

**Load**:
```typescript
const loadDraftFromStorage = (): Partial<DonationState> => {
  try {
    const draft = localStorage.getItem('donationDraft');
    return draft ? JSON.parse(draft) : {};
  } catch {
    return {};
  }
};
```

**Clear**:
```typescript
// On successful donation or reset
localStorage.removeItem('donationDraft');
```

---

## Component Hierarchy

```
DonationFlow (Orchestrator)
├── DonationSteps (Breadcrumb navigation)
├── Current Step Component
│   ├── IntroStep
│   ├── FrequencyStep
│   ├── FundsAmountStep
│   │   └── AllActionsModal
│   ├── ContactDetailsStep
│   │   └── DynamicInput (for each form field)
│   ├── ReviewPaymentStep
│   └── StatusStep
└── DonationNavigation (Back/Next buttons)
```

---

## State Flow Summary

```
1. User selects frequency
   → dispatch(setFrequency('one-time'))
   
2. User selects cause and amount
   → dispatch(updateFundsSelection({ causeId, amount }))
   → dispatch(addItem({ id, causeId, name, amount }))
   → dispatch(clearFundsSelection())
   
3. User fills contact details
   → Auto-save: dispatch(updateUserDetails(data))
   → Auto-save: dispatch(saveDonationDraft(data))
   
4. User reviews and selects payment
   → dispatch(setLastDonationSummary({ items, totalAmount, frequency }))
   → Create payment gateway
   → Redirect to payment page
   
5. Payment gateway returns
   → Read URL params
   → dispatch(setDonationStatus('success'))
   → dispatch(clearCart())
   → dispatch(setStep('status'))
   
6. User completes or starts new donation
   → dispatch(resetDonation())
   → localStorage.removeItem('donationDraft')
```

---

## Error Handling

### Validation Errors
- Display inline below fields
- Prevent form submission
- Clear when field is corrected

### Payment Errors
- Caught in try-catch block
- Set status to 'failed'
- Navigate to status step
- Show error message
- Provide "Try Again" option

### Network Errors
- Display error message
- Maintain user data
- Allow retry
- Don't clear cart

---

## Key Features

1. **Multi-step flow** with breadcrumb navigation
2. **Real-time validation** on all inputs
3. **Auto-save functionality** to prevent data loss
4. **Cart system** for multiple cause donations
5. **Payment gateway integration** with Payrexx
6. **Persistent state** across navigation
7. **LocalStorage backup** for draft recovery
8. **Responsive design** for all screen sizes
9. **Error handling** at each step
10. **Success/failure feedback** with detailed status

---

## Future Enhancements

- Backend API integration for draft saving
- Email confirmation system
- Receipt generation and download
- Donation history tracking
- Recurring payment management
- Multi-language support
- Analytics tracking
- A/B testing capabilities
