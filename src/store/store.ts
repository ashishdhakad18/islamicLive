import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import donationReducer from "./slices/donationSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    donation: donationReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
