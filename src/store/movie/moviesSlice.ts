import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {tmdbService} from '../../service/tmbdService';
import type {Movie} from '../../types/TMBDTypes';

interface MoviesState {
  nowPlaying: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  nowPlaying: [],
  isLoading: false,
  error: null,
};

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlayingMovies',
  async () => {
    console.log('Fetching movies...');
    try {
      const response = await tmdbService.getNowPlayingMovies();
      console.log('Raw response:', response);
      console.log('Results:', response.results);
      return response.results;
    } catch (error) {
      console.log('Error fetching:', error);
      throw error;
    }
  },
);
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nowPlaying = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export default moviesSlice.reducer;
