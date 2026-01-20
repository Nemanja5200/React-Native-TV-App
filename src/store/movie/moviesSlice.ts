import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MediaType, MEDIA_TYPE} from '../../constants/Media';
import {tmdbService} from '../../service/tmbdService';
import type {
  Details,
  Movie,
  SeriesDetails,
  TVShow,
} from '../../types/TMBDTypes';

interface MoviesState {
  nowPlaying: Movie[];
  popularTVShows: TVShow[];
  details: Details | SeriesDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  nowPlaying: [],
  popularTVShows: [],
  details: null,
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

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async ({id, type}: {id: number; type: MediaType}) => {
    const response =
      type === MEDIA_TYPE.SERIES
        ? await tmdbService.getSeriesDetails(id)
        : await tmdbService.getMovieDetails(id);
    return response;
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
      })

      .addCase(fetchDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failt to fetch details';
      });
  },
});

export default moviesSlice.reducer;
