import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  moviesList: [],
  loading: false,
  error: "",
  searchMoviesList: [],
  loadingSearch: false,
  errorSearch: false,
  movieDetails: {},
};
// Get All Movies
export const getAllMovies = createAsyncThunk(
  "getAllMovies",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=14bdd69ce887376edfafb09f23f78fe9`
      );
      //   console.log(data.results);
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Get All Movies From Search
export const getAllMoviesSearch = createAsyncThunk(
  "getAllMoviesSearch",
  async (movieName, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=14bdd69ce887376edfafb09f23f78fe9&query=${movieName}`
      );

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Get Movie Details
export const getMovieDetails = createAsyncThunk(
  "getMovieDetails",
  async (movieData, thunk) => {
    const { media_type, id } = movieData;
    // console.log(id, media_type);
    const { rejectWithValue } = thunk;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=14bdd69ce887376edfafb09f23f78fe9`
      );
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const moviesSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Movies ************
    builder.addCase(getAllMovies.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.moviesList = action.payload;
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
    // Get All Movies Search **********
    builder.addCase(getAllMoviesSearch.pending, (state) => {
      state.loadingSearch = true;
      state.errorSearch = "";
    });
    builder.addCase(getAllMoviesSearch.fulfilled, (state, action) => {
      state.loadingSearch = false;
      state.searchMoviesList = action.payload;
    });
    builder.addCase(getAllMoviesSearch.rejected, (state, action) => {
      state.loadingSearch = false;
      state.errorSearch = action.payload;
    });
    // Get Movies Details **********
    builder.addCase(getMovieDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.movieDetails = action.payload;
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
