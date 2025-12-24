import React, {useState, forwardRef} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {FONTS} from '../constants/Fonts';
import FocusableElement from './FocusableElement';

type Props = {
  title: string;
  hasTVPreferredFocus?: boolean;
  nextFocusRight?: number;
  nextFocusLeft?: number;
  nextFocusUp?: number;
  nextFocusDown?: number;
};

const NavItem = forwardRef<TouchableOpacity, Props>(
  (
    {
      title,
      hasTVPreferredFocus = false,
      nextFocusRight,
      nextFocusLeft,
      nextFocusUp,
      nextFocusDown,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusableElement
        ref={ref}
        style={styles.container}
        hasTVPreferredFocus={hasTVPreferredFocus}
        nextFocusRight={nextFocusRight}
        nextFocusLeft={nextFocusLeft}
        nextFocusUp={nextFocusUp}
        nextFocusDown={nextFocusDown}
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
  },
);

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
