import {StyleProp, ViewStyle} from '@amazon-devices/react-native-kepler/types';
import React, {useState, forwardRef} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface FocusableElementProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  focusedStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasTVPreferredFocus?: boolean;
  nextFocusUp?: number;
  nextFocusDown?: number;
  nextFocusLeft?: number;
  nextFocusRight?: number;
}

const FocusableElement = forwardRef<TouchableOpacity, FocusableElementProps>(
  (
    {
      children,
      style,
      focusedStyle,
      onPress,
      onFocus,
      onBlur,
      hasTVPreferredFocus,
      nextFocusUp,
      nextFocusDown,
      nextFocusLeft,
      nextFocusRight,
      ...otherProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={1}
        hasTVPreferredFocus={hasTVPreferredFocus}
        nextFocusUp={nextFocusUp}
        nextFocusDown={nextFocusDown}
        nextFocusLeft={nextFocusLeft}
        nextFocusRight={nextFocusRight}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={onPress}
        style={[style, isFocused && focusedStyle]}
        {...otherProps}>
        {children}
      </TouchableOpacity>
    );
  },
);

export default React.memo(FocusableElement);
