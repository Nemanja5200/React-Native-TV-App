import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MediaType, MEDIA_TYPE} from '../../constants/Media';
import {tmdbService} from '../../service/tmbdService';
import type {
  Details,
  Movie,
  MovieWithHeroPoster,
  SeriesDetails,
  TVShow,
} from '../../types/TMBDTypes';

interface MoviesState {
  nowPlaying: Movie[];
  popularTVShows: TVShow[];
  details: Details | SeriesDetails | null;
  upcomingMoviesWithDetails: MovieWithHeroPoster[];
  upcomingMovies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  nowPlaying: [],
  popularTVShows: [],
  upcomingMovies: [],
  upcomingMoviesWithDetails: [],
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

export const fetchUpcomingMovies = createAsyncThunk(
  'upcoming/fetchUpcomingMovies',
  async () => {
    const response = await tmdbService.getUpcomingMovies();
    return response.results;
  },
);

export const fetchUpcomingMoviesWithDetails = createAsyncThunk<
  MovieWithHeroPoster[]
>('upcoming/fetchUpcomingMoviesWithDetails', async () => {
  const response = await tmdbService.getUpcomingMovies();
  const movies = response.results;

  const moviesWithDetails: MovieWithHeroPoster[] = await Promise.all(
    movies.map(async (movie): Promise<MovieWithHeroPoster> => {
      try {
        const details = await tmdbService.getMovieDetails(movie.id);

        return {
          ...movie,
          heroPoster: details.heroPoster ?? movie.backdrop_path ?? null,
          overview: details.overview || null,
        };
      } catch (error) {
        console.error(`Failed to fetch details for movie ${movie.id}:`, error);

        return {
          ...movie,
          heroPoster: movie.backdrop_path ?? null,
          overview: null,
        };
      }
    }),
  );

  return moviesWithDetails;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearDetails: (state) => {
      state.details = null;
      state.error = null;
    },
  },
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
        state.error = action.error.message || 'Failed to fetch details';
      })

      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch upcoming Movies';
      })

      .addCase(fetchUpcomingMoviesWithDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMoviesWithDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingMoviesWithDetails = action.payload;
      })
      .addCase(fetchUpcomingMoviesWithDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          'Failed to fetch upcoming movies with details';
      });
  },
});

export const {clearDetails} = moviesSlice.actions;
export default moviesSlice.reducer;
