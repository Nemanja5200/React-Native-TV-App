import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONTS} from '../constants/Fonts';

type Props = {
  title: string;
};

const NavItem = ({title}: Props) => {
  return <Text style={[styles.text]}>{title}</Text>;
};

export default React.memo(NavItem);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  containerFocused: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  text: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    color: '#888888',
  },
  textFocused: {
    color: '#ffffff',
  },
});
