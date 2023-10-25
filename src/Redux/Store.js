import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./Slices/MoviesSlice";
export const store = configureStore({
  reducer: {
    moviesSlice,
  },
});
