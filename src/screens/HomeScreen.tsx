import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Header from '../components/Header';
import {IMAGE} from '../constants/Image';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={IMAGE.BACKGROUND}
      style={styles.container}
      resizeMode="cover">
      <Header />
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
});
