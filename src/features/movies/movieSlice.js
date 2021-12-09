import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import movieApi from '../../common/api/movieApi';
import { APIKey } from '../../common/api/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const response = await movieApi.get(
      `?apikey=${ APIKey }&s=${term}&type=movie`
    )
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const response = await movieApi.get(
      `?apikey=${ APIKey }&s=${term}&type=series`
    )
    return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const response = await movieApi.get(
      `?apikey=${ APIKey }&i=${id}&Plot=full`
    )
    return response.data;
});

const initialState = {
  movies: {},
  shows:{},
  selectMovieOrShow:{},
}

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers:{
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow= {};
    },
  },
  extraReducers:{
    [fetchAsyncMovies.pending] : () => { console.log("Pending") },
    [fetchAsyncMovies.fulfilled] : (state, { payload }) => {
       console.log("fetched Successfully"); 
       return {...state, movies: payload};
    },
    [fetchAsyncMovies.rejected] : () => {
      console.log("rejected"); 
    },
    [fetchAsyncShows.fulfilled] : (state, { payload }) => {
      console.log("fetched Successfully"); 
      return {...state, shows: payload};
    },
    [fetchAsyncMovieOrShowDetail.fulfilled] : (state, { payload }) => {
      console.log("fetched Successfully"); 
      return {...state, selectMovieOrShow: payload};
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;