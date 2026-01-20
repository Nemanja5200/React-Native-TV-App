import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {tmdbService} from '../../service/tmbdService';
import type {Movie, TVShow} from '../../types/TMBDTypes';

interface MoviesState {
  nowPlaying: Movie[];
  popularTVShows: TVShow[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  nowPlaying: [],
  popularTVShows: [],
  isLoading: false,
  error: null,
};

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlayingMovies',
  async () => {
    const response = await tmdbService.getNowPlayingMovies();
    return response.results;
  },
);

export const fetchPopularTVShows = createAsyncThunk(
  'tvShow/fetchPopularTVShows',
  async () => {
    const response = await tmdbService.getPopularSeries();
    return response.results;
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
      })

      .addCase(fetchPopularTVShows.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchPopularTVShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularTVShows = action.payload;
      })

      .addCase(fetchPopularTVShows.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch popular series';
      });
  },
});

export default moviesSlice.reducer;
