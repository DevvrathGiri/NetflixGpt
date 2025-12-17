import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

interface GptState {
  showGptSearch: boolean;
  movieNames: string[] | null;
  movieResults: any[] | null; // you can type this later with TMDB type
}

interface GptMoviePayload {
  movieNames: string[];
  movieResults: any[];
}

/* ================= SLICE ================= */

const initialState: GptState = {
  showGptSearch: false,
  movieNames: null,
  movieResults: null,
};

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },

    addGptMovieresult: (
      state,
      action: PayloadAction<GptMoviePayload>
    ) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSearchView, addGptMovieresult } =
  gptSlice.actions;

export default gptSlice.reducer;
