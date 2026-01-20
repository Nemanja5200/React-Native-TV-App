import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_SERVER_URL} from '@env';
import {TMBD_ROUTE} from '../../constants/TMBD_ROUTS';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: EXPO_PUBLIC_SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${EXPO_PUBLIC_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNowPlayingMovies: builder.query<any, void>({
      query: () => TMBD_ROUTE.NOW_PLAYING_MOVIES,
    }),
    getPopularShows: builder.query({
      query: () => TMBD_ROUTE.POPULAR_SHOWS,
    }),
  }),
});

export const {useGetNowPlayingMoviesQuery, useGetPopularShowsQuery} = tmdbApi;
