import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View, Text, Image} from 'react-native';
import MovieCarousel from '../components/MovieCarousel';
import {MEDIA_TYPE} from '../constants/Media';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {fetchUpcomingMoviesWithDetails} from '../store/movie/moviesSlice';
import {IMAGE_POSTER_URL} from '../constants/Links';
import LinearGradient from '@amazon-devices/react-linear-gradient';
import type {Movie, MovieWithHeroPoster, TVShow} from '../types/TMBDTypes';

const MovieScreen = () => {
  const dispatch = useAppDispatch();
  const {upcomingMoviesWithDetails, isLoading, error} = useAppSelector(
    (state) => state.movies,
  );

  const [focusedMovie, setFocusedMovie] = useState<MovieWithHeroPoster | null>(
    null,
  );

  const handleCardFocus = useCallback(
    (movie: Movie | TVShow | MovieWithHeroPoster) => {
      setFocusedMovie(movie as MovieWithHeroPoster);
    },
    [],
  );

  useEffect(() => {
    dispatch(fetchUpcomingMoviesWithDetails());
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={styles.loadingText}>Loading movies...</Text>
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const heroMovie = focusedMovie ?? upcomingMoviesWithDetails[0];

  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        {heroMovie?.heroPoster && (
          <>
            <Image
              source={{uri: IMAGE_POSTER_URL + heroMovie.heroPoster}}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                '#151515',
                '#151515',
                'rgba(21, 21, 21, 0.5)',
                'transparent',
              ]}
              locations={[0, 0.7, 0.85, 1]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.heroSolidGradient}
              pointerEvents="none"
            />
            <LinearGradient
              colors={[
                '#151515',
                '#151515',
                'rgba(21, 21, 21, 0.7)',
                'transparent',
              ]}
              locations={[0.2, 0.2, 0.5, 0.9]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.heroGradient}
              pointerEvents="none"
            />
          </>
        )}
      </View>

      {heroMovie && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {heroMovie.title}
          </Text>
          {heroMovie.overview && (
            <Text style={styles.movieOverview} numberOfLines={4}>
              {heroMovie.overview}
            </Text>
          )}
        </View>
      )}

      <View style={styles.cardsWrapper}>
        {upcomingMoviesWithDetails.length > 0 && (
          <MovieCarousel
            data={upcomingMoviesWithDetails}
            cardDimensions={{width: 440, height: 256}}
            testID="upcoming-movies-carousel"
            type={MEDIA_TYPE.MOVIE}
            onCardFocus={handleCardFocus}
          />
        )}
      </View>
    </View>
  );
};
export default React.memo(MovieScreen);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#151515',
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 697,
    overflow: 'hidden',
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.35,
  },
  heroSolidGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '30%',
    height: '100%',
    zIndex: 1,
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  descriptionContainer: {
    position: 'absolute',
    minWidth: 698,
    minHeight: 182,
    top: 258,
    left: 69,
    gap: 35,
    zIndex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  movieTitle: {
    width: 446,
    height: 34,
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 34,
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  movieOverview: {
    width: 698,
    height: 124,
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 31,
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  cardsWrapper: {
    position: 'absolute',
    opacity: 1,
    width: '96.5%',
    top: 697,
    left: 64,
    gap: 24,
    zIndex: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151515',
  },
  loadingText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151515',
  },
  errorText: {
    fontSize: 20,
    color: '#FF0000',
    fontWeight: '600',
  },
});
