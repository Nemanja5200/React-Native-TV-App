import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../styles/Colors';
import {Movie} from '../types/Movie';

interface MovieCardProps {
  data: Movie;
  width: number;
  height: number;
}

const MovieCard = ({data, width, height}: MovieCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={data.image}
        style={{
          width: width,
          height: height,
        }}
        resizeMode="cover"
      />
      <Text style={styles.title}>{data.title}</Text>
    </View>
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
});
