import {StyleSheet} from '@amazon-devices/react-native-kepler/types';
import React from 'react';
import {Image, View} from 'react-native/types';

import {IMAGES} from '../constants/Assets';
const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.Logo} style={styles.Logo} resizeMode="contain" />
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: 120,
    height: 40,
  },
});
