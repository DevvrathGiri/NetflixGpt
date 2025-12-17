import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

interface Movie {
  id: number;
  poster_path: string;
  original_title?: string;
  overview?: string;
}

interface TrailerVideo {
  id: string;
  key: string;
  name: string;
  type: string;
}

interface MoviesState {
  nowPlayingMovies: Movie[];
  popularMovies:Movie[];
  trailerVideo: TrailerVideo | null;
}

/* ================= INITIAL STATE ================= */

const initialState: MoviesState = {
  nowPlayingMovies: [],
  popularMovies:[],
  trailerVideo: null,
};

/* ================= SLICE ================= */

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addNowPlayingMovies: (
      state,
      action: PayloadAction<Movie[]>
    ) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (
      state,
      action: PayloadAction<Movie[]>
    ) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (
      state,
      action: PayloadAction<TrailerVideo>
    ) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo,addPopularMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
