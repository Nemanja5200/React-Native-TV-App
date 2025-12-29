import React, {forwardRef, useState} from 'react';
import {Image, Text} from 'react-native';
import buttonStyles from './buttonStyle';
import {COLORS} from '../../styles/Colors';
import {ButtonType} from './buttonType';
import FocusableElement from '../FocusableElement';

const ButtonIcon = forwardRef<any, ButtonType>(
  (
    {
      onClick,
      icon,
      size,
      color = COLORS.WHITE,
      text,
      width,
      height,
      radius = 6,
      hasTVPreferredFocus = false,
    },
    ref,
  ) => {
    const styles = buttonStyles();
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusableElement
        ref={ref} // Forward the ref here
        hasTVPreferredFocus={hasTVPreferredFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPress={onClick}
        style={[
          styles.buttonIcon,
          {
            width,
            height,
            backgroundColor: isFocused ? COLORS.BORDER : color,
            borderRadius: radius,
          },
        ]}>
        {icon && (
          <Image
            source={icon}
            style={{
              width: size,
              height: size,
              tintColor: COLORS.WHITE,
              resizeMode: 'contain',
            }}
          />
        )}
        {text && <Text style={styles.text}>{text}</Text>}
      </FocusableElement>
    );
  },
);

export default React.memo(ButtonIcon);
