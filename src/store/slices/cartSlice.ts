import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  causeId?: string;
  amount: number;
  name: string;
  frequency?: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const saveToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("donationCart", JSON.stringify(state));
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.totalAmount += action.payload.amount;
      saveToLocalStorage(state);
    },
    updateItem: (
      state,
      action: PayloadAction<{ causeId: string; amount: number }>
    ) => {
      const item = state.items.find(
        (i) => i.causeId === action.payload.causeId
      );
      if (item) {
        state.totalAmount =
          state.totalAmount - item.amount + action.payload.amount;
        item.amount = action.payload.amount;
        saveToLocalStorage(state);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.totalAmount -= state.items[index].amount;
        state.items.splice(index, 1);
        saveToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      if (typeof window !== "undefined") {
        localStorage.removeItem("donationCart");
      }
    },
    hydrateCart: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("donationCart");
        if (saved) {
          const parsed = JSON.parse(saved);
          state.items = parsed.items;
          state.totalAmount = parsed.totalAmount;
        }
      }
    },
  },
});

export const { addItem, updateItem, removeItem, clearCart, hydrateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
