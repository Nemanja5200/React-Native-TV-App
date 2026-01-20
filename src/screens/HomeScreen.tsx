import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Layout from '../components/Layout';
import MovieCarousel from '../components/MovieCarousel';
import TopWatched from '../components/TopWatched';
import {IMAGE} from '../constants/Image';
import {MEDIA_TYPE} from '../constants/Media';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  fetchNowPlayingMovies,
  fetchPopularTVShows,
} from '../store/movie/moviesSlice';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {nowPlaying, popularTVShows} = useAppSelector((state) => state.movies);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchNowPlayingMovies()),
        dispatch(fetchPopularTVShows()),
      ]);
    };
    fetchData();
  }, [dispatch]);

  return (
    <ImageBackground
      source={IMAGE.BACKGROUND}
      style={styles.container}
      resizeMode="cover">
      <Layout showHeader={true}>
        <View style={styles.mainContent}>
          <View style={styles.rightSection}>
            <MovieCarousel
              heading="MOVIES"
              data={nowPlaying.slice(0, 5)}
              cardDimensions={{width: 220, height: 300}}
              testID="trending-carousel"
              type={MEDIA_TYPE.MOVIE}
            />

            <MovieCarousel
              heading="SERIES"
              data={popularTVShows.slice(0, 5)}
              cardDimensions={{width: 220, height: 300}}
              testID="trending-carousel"
              type={MEDIA_TYPE.SERIES}
            />
          </View>
          <View style={styles.leftSection}>
            <TopWatched />
          </View>
        </View>
      </Layout>
    </ImageBackground>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },

  leftSection: {
    width: 400,
    marginRight: 80,
  },

  rightSection: {
    flex: 1,
    marginTop: 35,
  },

  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
