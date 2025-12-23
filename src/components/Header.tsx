import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {IMAGES} from '../constants/Assets';
import {NAV_ITEMS} from '../constants/Navigation';
import {COLORS} from '../styles/Colors';
import FocusableElement from './FocusableElement';
import NavItem from './NavItem';
const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <Image source={IMAGES.Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.navContainer}>
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={item.id}
            title={item.title}
            hasTVPreferredFocus={index === 0}
          />
        ))}
      </View>
    </View>
  );
};

export default React.memo(Header);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    gap: 48,
  },
  logo: {
    width: 305,
    height: 60,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },

  textFocus: {
    color: COLORS.WHITE,
  },
});
