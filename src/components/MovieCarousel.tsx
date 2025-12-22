import React, {memo, useCallback, useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  Carousel,
  CarouselRenderInfo,
  ItemInfo,
  Typography,
} from '@amazon-devices/kepler-ui-components';
import {Movie} from '../types/Movie';
import {COLORS} from '../styles/Colors';
import MovieCard from './MovieCard';

interface MovieCarouselProps {
  heading: string;
  data: Movie[];
  cardDimensions?: {width: number; height: number};
  testID?: string;
  isLastItem?: boolean;
}

const SPACING = {
  itemPadding: 12,
  firstItemOffset: 50,
};

const MovieCarousel = ({
  heading,
  data,
  cardDimensions = {width: 250, height: 300},
  testID,
  isLastItem = false,
}: MovieCarouselProps) => {
  const ItemView = useCallback(
    ({item}: CarouselRenderInfo<Movie>) => {
      return (
        <MovieCard
          data={item}
          width={cardDimensions.width}
          height={cardDimensions.height}
        />
      );
    },
    [cardDimensions],
  );

  const viewInfos: ItemInfo[] = useMemo(
    () => [
      {
        view: ItemView,
        dimension: {
          width: cardDimensions.width + SPACING.itemPadding * 2,
          height: cardDimensions.height,
        },
      },
    ],
    [ItemView, cardDimensions],
  );

  const getItemForIndex = useCallback(() => ItemView, [ItemView]);

  const computedStyles = useMemo(() => {
    const expandedHeight = cardDimensions.height * 1.1;
    return StyleSheet.create({
      listView: {
        height: expandedHeight + 60,
      },
      container: {
        marginBottom: isLastItem ? 0 : 20,
      },
    });
  }, [cardDimensions.height, isLastItem]);

  return (
    <View testID={testID} style={computedStyles.container}>
      <Typography
        variant="body"
        style={[styles.heading, {marginLeft: SPACING.firstItemOffset}]}>
        {heading}
      </Typography>
      <View style={styles.carouselContainer}>
        {data.length > 0 && (
          <Carousel
            testID={`carousel-${testID}`} // ✅ Fixed
            containerStyle={computedStyles.listView}
            data={data}
            orientation="horizontal"
            itemDimensions={viewInfos}
            itemPadding={SPACING.itemPadding}
            renderItem={ItemView}
            getItemForIndex={getItemForIndex}
            keyProvider={(item, index) => `${item.id}-${index}`}
            focusIndicatorType="fixed"
            firstItemOffset={SPACING.firstItemOffset}
            itemSelectionExpansion={{
              widthScale: 1.1,
              heightScale: 1.1,
            }}
            itemScrollDelay={0.3}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: '#FFFFFF',
    padding: 0,
    margin: 0,
    paddingBottom: 10,
  },
  carouselContainer: {
    margin: 0,
    padding: 0,
    paddingBottom: 35,
  },
  card: {
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: COLORS.LIGHT_GREY,
    marginTop: 10,
  },
});

export default memo(MovieCarousel);
