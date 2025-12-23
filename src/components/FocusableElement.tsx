import {StyleProp, ViewStyle} from '@amazon-devices/react-native-kepler/types';
import React, {useState} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface FocusableElementProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  focusedStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasTVPreferredFocus?: boolean;
}

const FocusableElement = ({
  children,
  style,
  focusedStyle,
  onPress,
  onFocus,
  onBlur,
  hasTVPreferredFocus,
  ...otherProps
}: FocusableElementProps) => {
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
      activeOpacity={1}
      hasTVPreferredFocus={hasTVPreferredFocus}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPress={onPress}
      style={[style, isFocused && focusedStyle]}
      {...otherProps}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(FocusableElement);
