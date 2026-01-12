import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DonationContent,
  getDonationContent,
} from "@/data/donationTranslations";

export type DonationStep =
  | "intro"
  | "frequency"
  | "funds"
  | "details"
  | "review"
  | "status";
export type DonationFrequency = "one-time" | "monthly" | "";
export type PaymentMethod = "twint" | "other";

interface ValidationError {
  field: string;
  message: string;
}

interface DonationState {
  currentStep: DonationStep;
  frequency: DonationFrequency;
  paymentMethod: PaymentMethod;
  userDetails: Record<string, any>;
  status: "idle" | "pending" | "success" | "failed";
  lastDonationSummary: {
    items: any[];
    frequency?: DonationFrequency;
    totalAmount: number;
    transactionId?: string;
  } | null;
  currentFundsSelection: {
    causeId: string | null;
    amount: number | null;
    customAmount: string;
  };
  // New fields for production readiness
  validationErrors: ValidationError[];
  isLoading: boolean;
  error: string | null;
  isDraftSaved: boolean;
  lastSavedAt: string | null;
  sessionId: string | null;
  // i18n content
  content: DonationContent;
  backendData: any | null;
}

// Async thunk for saving donation draft
export const saveDonationDraft = createAsyncThunk(
  "donation/saveDraft",
  async (draftData: Partial<DonationState>) => {
    // Save to localStorage as backup
    localStorage.setItem(
      "donationDraft",
      JSON.stringify({
        ...draftData,
        savedAt: new Date().toISOString(),
      })
    );

    // TODO: Also save to backend API
    // const response = await api.saveDonationDraft(draftData);
    // return response.data;

    return draftData;
  }
);

// Async thunk for processing donation
export const processDonation = createAsyncThunk(
  "donation/process",
  async (donationData: {
    userDetails: Record<string, any>;
    cartItems: any[];
    totalAmount: number;
    paymentMethod: string;
  }) => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

    return {
      transactionId: `TXN_${Date.now()}`,
      status: "success",
      ...donationData,
    };
  }
);

const loadDraftFromStorage = (): Partial<DonationState> => {
  try {
    const draft = localStorage.getItem("donationDraft");
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      // Exclude currentStep from restoration so users always go through the flow
      // This ensures the details step is always shown (with prefilled data) instead of being skipped
      const { currentStep, ...restOfDraft } = parsedDraft;
      return restOfDraft;
    }
    return {};
  } catch {
    return {};
  }
};

const initialState: DonationState = {
  currentStep: "intro",
  frequency: "",
  paymentMethod: "twint",
  userDetails: {},
  status: "idle",
  lastDonationSummary: null,
  currentFundsSelection: {
    causeId: null,
    amount: null,
    customAmount: "",
  },
  validationErrors: [],
  isLoading: false,
  error: null,
  isDraftSaved: false,
  lastSavedAt: null,
  sessionId: null,
  content: getDonationContent("en"),
  backendData: null,
  ...loadDraftFromStorage(),
};

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<DonationStep>) => {
      state.currentStep = action.payload;
      state.error = null;
    },
    setFrequency: (state, action: PayloadAction<DonationFrequency>) => {
      state.frequency = action.payload;
      state.isDraftSaved = false;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    updateUserDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
      state.isDraftSaved = false;
      state.validationErrors = state.validationErrors.filter(
        (error) => !Object.keys(action.payload).includes(error.field)
      );
    },
    setDonationStatus: (
      state,
      action: PayloadAction<DonationState["status"]>
    ) => {
      state.status = action.payload;
    },
    setLastDonationSummary: (
      state,
      action: PayloadAction<DonationState["lastDonationSummary"]>
    ) => {
      state.lastDonationSummary = action.payload;
    },
    updateFundsSelection: (
      state,
      action: PayloadAction<Partial<DonationState["currentFundsSelection"]>>
    ) => {
      state.currentFundsSelection = {
        ...state.currentFundsSelection,
        ...action.payload,
      };
      state.isDraftSaved = false;
    },
    clearFundsSelection: (state) => {
      state.currentFundsSelection = {
        causeId: null,
        amount: null,
        customAmount: "",
      };
    },
    setValidationErrors: (state, action: PayloadAction<ValidationError[]>) => {
      state.validationErrors = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    resetDonation: (state) => {
      localStorage.removeItem("donationDraft");
      return {
        ...initialState,
        sessionId: null,
        lastSavedAt: null,
      };
    },
    // Pre-fill donation data from external forms (e.g., homepage donation form)
    preFillDonation: (
      state,
      action: PayloadAction<{
        frequency: DonationFrequency;
        fundId: string;
        fundName: string;
        amount: number;
      }>
    ) => {
      const { frequency, fundId, fundName, amount } = action.payload;
      state.frequency = frequency;
      state.currentStep = "details"; // Skip to details step
      // Cart will be populated separately via cartSlice
    },
    // Set i18n content based on locale
    setDonationContent: (state, action: PayloadAction<DonationContent>) => {
      state.content = action.payload;
    },
    // Set backend data
    setBackendData: (state, action: PayloadAction<any>) => {
      state.backendData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDonationDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveDonationDraft.fulfilled, (state) => {
        state.isLoading = false;
        state.isDraftSaved = true;
        state.lastSavedAt = new Date().toISOString();
      })
      .addCase(saveDonationDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to save draft";
      })
      .addCase(processDonation.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(processDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.lastDonationSummary = {
          items: action.meta.arg.cartItems,
          totalAmount: action.meta.arg.totalAmount,
          transactionId: action.payload.transactionId,
        };
        localStorage.removeItem("donationDraft");
      })
      .addCase(processDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message || "Donation processing failed";
      });
  },
});

export const {
  setStep,
  setFrequency,
  setPaymentMethod,
  updateUserDetails,
  setDonationStatus,
  setLastDonationSummary,
  updateFundsSelection,
  clearFundsSelection,
  setValidationErrors,
  clearError,
  setSessionId,
  resetDonation,
  preFillDonation,
  setDonationContent,
  setBackendData,
} = donationSlice.actions;

export default donationSlice.reducer;
