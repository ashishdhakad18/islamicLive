import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "EN" | "FR" | "DE";
export type Theme = "light" | "dark";

interface UIState {
  language: Language;
  theme: Theme;
}

const initialState: UIState = {
  language: "EN",
  theme: "light",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      // You can add logic here to trigger a re-fetch or update other states if needed
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      // In a real app, you might apply class to document.documentElement here
      if (typeof window !== "undefined") {
        if (state.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        if (state.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
  },
});

export const { setLanguage, toggleTheme, setTheme } = uiSlice.actions;

export default uiSlice.reducer;
