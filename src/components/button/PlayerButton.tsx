import React, {memo, useState} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import {ButtonType} from './buttonType';
import FocusableElement from '../FocusableElement';

const PlayerButton = ({
  onClick,
  icon,
  size = 24,
  color = '#333',
  width = 66,
  height = 66,
  radius = 33,
  hasTVPreferredFocus = false,
  borderColor = '#555',
  borderSize = 8,
  focusScale = 1.15,
}: ButtonType & {
  borderColor?: string;
  borderSize?: number;
  focusScale?: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FocusableElement
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={onClick}
      hasTVPreferredFocus={hasTVPreferredFocus}>
      <View
        style={[
          styles.container,
          {
            transform: [{scale: isFocused ? focusScale : 1}],
          },
        ]}>
        <View
          style={[
            styles.outerCircle,
            {
              width: width + borderSize,
              height: height + borderSize,
              borderRadius: radius + borderSize / 2,
              backgroundColor: isFocused ? '#ED1C24' : borderColor,
            },
          ]}>
          <View
            style={[
              styles.innerCircle,
              {
                width: width,
                height: height,
                borderRadius: radius,
                backgroundColor: color,
              },
            ]}>
            {icon && (
              <Image
                source={icon}
                style={[styles.icon, {width: size, height: size}]}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </View>
    </FocusableElement>
  );
};

export default memo(PlayerButton);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: '#fff',
  },
});
