import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@amazon-devices/react-navigation__native';
import {Screens} from '../navigation/types';
import {COLORS} from '../styles/Colors';
import FocusableElement from './FocusableElement';
import {focusManager} from '../utils/FocusManager';
import {EXPO_PUBLIC_URL_API} from '@env';
import {Movie, MovieWithHeroPoster, TVShow} from '../types/TMBDTypes';
import {MediaType} from '../constants/Media';

interface MovieCardProps {
  data: Movie | TVShow | MovieWithHeroPoster;
  type: MediaType;
  width: number;
  height: number;
  onCardFocus?: (item: Movie | TVShow | MovieWithHeroPoster, ref: any) => void;
}

const MovieCard = ({
  data,
  width,
  height,
  type,
  onCardFocus,
}: MovieCardProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation<any>();
  const cardRef = useRef<any>(null);

  useEffect(() => {
    console.log(data.id);
    setTimeout(() => {
      focusManager.registerFocusCallback(`tile_${data.id}`, () => {
        console.log(`Restoring focus to tile_${data.id}`);
        console.log('cardRef.current:', cardRef.current);
        cardRef.current?.requestTVFocus();
      });
    }, 1000);
  }, [data.id]);

  const getRef = useCallback(() => {
    console.log(`tile_${data.id}`);
    focusManager.registerFocusCallback(`tile_${data.id}`, () => {
      console.log(`Restoring focus to tile_${data.id}`);
      cardRef.current?.requestTVFocus();
    });
  }, [data.id]);

  const handlePress = useCallback(() => {
    setTimeout(() => {
      navigation.navigate(Screens.DETAILS_SCREEN, {
        id: data.id,
        title: data.title,
        focusId: data.id,
        type: type,
      });
    }, 200);
  }, [data, navigation, type]);

  return (
    <FocusableElement
      ref={cardRef}
      style={styles.card}
      onFocus={() => {
        onCardFocus?.(data, cardRef.current);
        setIsFocused(true);
        getRef();
      }}
      onBlur={() => setIsFocused(false)}
      onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{uri: `${EXPO_PUBLIC_URL_API}${data.poster}`}}
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
