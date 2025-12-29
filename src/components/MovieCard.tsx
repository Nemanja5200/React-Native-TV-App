import React, {memo, useCallback, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@amazon-devices/react-navigation__native';
import {AppStackParamList, Screens} from '../navigation/types';
import {COLORS} from '../styles/Colors';
import {Movie} from '../types/Movie';
import FocusableElement from './FocusableElement';
import {focusManager} from '../utils/FocusManager';

interface MovieCardProps {
  data: Movie;
  width: number;
  height: number;
}

const MovieCard = ({data, width, height}: MovieCardProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation<any>();
  const cardRef = useRef<any>(null);

  const handlePress = useCallback(() => {
    console.log(`tile_${data.id}`); // ✅ Added ( before backtick

    focusManager.registerFocusCallback(`tile_${data.id}`, () => {
      // ✅ Added ( before backtick
      console.log(`Restoring focus to tile_${data.id}`); // ✅ Added ( before backtick
      cardRef.current?.requestTVFocus();
    });

    navigation.navigate(Screens.DETAILS_SCREEN, {
      id: data.id,
      title: data.title,
      focusId: data.id,
    });
  }, [data, navigation]);

  return (
    <FocusableElement
      ref={cardRef}
      style={styles.card}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={data.image}
          style={[
            {
              width: width,
              height: height,
              borderRadius: 8,
            },
            isFocused && styles.imageFocus,
          ]}
          resizeMode="cover"
        />
        <Text style={[styles.title, isFocused && styles.titleFocus]}>
          {data.title}
        </Text>
      </View>
    </FocusableElement>
  );
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  title: {
    color: COLORS.LIGHT_GREY,
    fontSize: 24,
    paddingTop: 10,
  },
  titleFocus: {
    color: 'white',
  },
  imageFocus: {
    borderWidth: 5,
    borderColor: COLORS.BORDER,
  },
});
