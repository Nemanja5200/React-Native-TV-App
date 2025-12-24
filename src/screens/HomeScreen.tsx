import {useFocusEffect} from '@amazon-devices/react-navigation__native';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Layout from '../components/Layout';
import MovieCarousel from '../components/MovieCarousel';
import TopWatched from '../components/TopWatched';
import {IMAGE} from '../constants/Image';
import {TRENDING_MOVIES} from '../constants/Movies';

const HomeScreen = () => {
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
              data={TRENDING_MOVIES}
              cardDimensions={{width: 220, height: 300}}
              testID="trending-carousel"
            />

            <MovieCarousel
              heading="SERIES"
              data={TRENDING_MOVIES}
              cardDimensions={{width: 220, height: 300}}
              testID="trending-carousel"
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
