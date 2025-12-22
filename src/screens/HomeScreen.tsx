import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import MovieCarousel from '../components/MovieCarousel';
import {IMAGE} from '../constants/Image';
import {TRENDING_MOVIES} from '../constants/Movies';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={IMAGE.BACKGROUND}
      style={styles.container}
      resizeMode="cover">
      <Header />

      <View style={styles.carouselSection}>
        <MovieCarousel
          heading="MOVIES"
          data={TRENDING_MOVIES}
          cardDimensions={{width: 220, height: 300}}
          testID="trending-carousel"
        />
      </View>
    </ImageBackground>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  carouselSection: {
    marginTop: 50,
  },
});
