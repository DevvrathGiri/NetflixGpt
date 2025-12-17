import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LanguageKey } from "./languageConstants";

/* ================= TYPES ================= */

interface ConfigState {
  lang: LanguageKey;
}

/* ================= SLICE ================= */

const initialState: ConfigState = {
  lang: "en",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageKey>) => {
      state.lang = action.payload;
    },
  },
});

/* ================= EXPORTS ================= */

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;
