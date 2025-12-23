import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {FONTS} from '../constants/Fonts';
import FocusableElement from './FocusableElement';

type Props = {
  title: string;
  hasTVPreferredFocus?: boolean;
};

const NavItem = ({title, hasTVPreferredFocus = false}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FocusableElement
      style={styles.container}
      hasTVPreferredFocus={hasTVPreferredFocus}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}>
      <View
        style={[styles.textWrapper, isFocused && styles.textWrapperFocused]}>
        <Text style={[styles.text, isFocused && styles.textFocused]}>
          {title}
        </Text>
      </View>
    </FocusableElement>
  );
};

export default React.memo(NavItem);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  textWrapper: {
    alignSelf: 'flex-start',
  },

  textWrapperFocused: {
    borderBottomWidth: 4,
    borderBottomColor: 'red',
    paddingBottom: 6,
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
