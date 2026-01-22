import {useNavigation} from '@amazon-devices/react-navigation__native';
import React, {useState, forwardRef, useCallback} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {FONTS} from '../constants/Fonts';
import {NavRoute, NAV_ITEMS, NAV_ITEM_TO_SCREEN} from '../constants/Navigation';
import FocusableElement from './FocusableElement';

type Props = {
  title: string;
  route?: NavRoute;
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
      route = NAV_ITEMS[1].route,
      hasTVPreferredFocus = false,
      nextFocusRight,
      nextFocusLeft,
      nextFocusUp,
      nextFocusDown,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation<any>();

    const handlePress = useCallback(() => {
      navigation.navigate(NAV_ITEM_TO_SCREEN[route]);
    }, [navigation, route]);

    return (
      <FocusableElement
        ref={ref}
        style={styles.container}
        hasTVPreferredFocus={hasTVPreferredFocus}
        nextFocusRight={nextFocusRight}
        nextFocusLeft={nextFocusLeft}
        nextFocusUp={nextFocusUp}
        nextFocusDown={nextFocusDown}
        onPress={handlePress}
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
