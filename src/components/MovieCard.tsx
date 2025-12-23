import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../styles/Colors';
import {Movie} from '../types/Movie';
import FocusableElement from './FocusableElement';

interface MovieCardProps {
  data: Movie;
  width: number;
  height: number;
}

const MovieCard = ({data, width, height}: MovieCardProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FocusableElement
      style={styles.card}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={() => console.log('Selected:', data.title)}>
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
