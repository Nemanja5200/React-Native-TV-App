import React, {useCallback, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  Platform,
  BackHandler,
} from 'react-native';
import style from './style';
import ButtonIcon from '../../components/button/ButtonIcon';
import {ICONS_IMAGES} from '../../constants/Assets';
import {COLORS} from '../../styles/Colors';
import {EXPO_PUBLIC_URL_API} from '@env';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@amazon-devices/react-navigation__native';
import {AppStackParamList, Screens} from '../../navigation/types';
import {StackNavigationProp} from '@amazon-devices/react-navigation__stack';
import {focusManager} from '../../utils/FocusManager';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {fetchDetails} from '../../store/movie/moviesSlice';
import {MEDIA_TYPE} from '../../constants/Media';

type DetailScreenNavigationProp = StackNavigationProp<AppStackParamList>;
type DetailScreenRouteProp = RouteProp<
  AppStackParamList,
  Screens.DETAILS_SCREEN
>;

const DetailPage = () => {
  const detailStyle = style();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const route = useRoute<DetailScreenRouteProp>();

  const {id, type, focusId} = route.params;
  const {details, isLoading, error} = useAppSelector((state) => state.movies);

  const isTVShow = type === MEDIA_TYPE.SERIES;

  useEffect(() => {
    dispatch(fetchDetails({id: Number(id), type}));
  }, [dispatch, id, type]);

  const navigateBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(Screens.HOME_SCREEN);
    }

    if (focusId) {
      setTimeout(() => {
        console.log(`Restoring focus to tile_${focusId}`);
        focusManager.restoreFocus(`tile_${focusId}`);
      }, 100);
    }
    return true;
  }, [navigation, focusId]);

  const onClickWatchNow = useCallback(() => {
    navigation.navigate(Screens.PLAYER_SCREEN);
  });

  useEffect(() => {
    if (Platform.isTV) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateBack,
      );
      return () => backHandler.remove();
    }
  }, [navigateBack]);

  // Loading state
  // if (isLoading) {
  //   return (
  //     <View
  //       style={[
  //         detailStyle.page,
  //         {justifyContent: 'center', alignItems: 'center'},
  //       ]}>
  //       <ActivityIndicator size="large" color={COLORS.WHITE} />
  //     </View>
  //   );
  // }

  // Error state
  if (error) {
    return (
      <View
        style={[
          detailStyle.page,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );
  }

  // No data
  if (!details) {
    return null;
  }

  const imageUrl = `${EXPO_PUBLIC_URL_API}${details.heroPoster}`;
  const posterUrl = `${EXPO_PUBLIC_URL_API}${details.poster}`;

  const Description = (
    <View style={detailStyle.inColumn}>
      <Text
        style={[detailStyle.textBig, detailStyle.overview]}
        numberOfLines={7}
        ellipsizeMode="tail">
        {details.overview}
      </Text>
      <ButtonIcon
        hasTVPreferredFocus={true}
        onClick={onClickWatchNow}
        icon={ICONS_IMAGES.PLAY_IMAGE}
        width={286}
        height={78}
        size={15}
        radius={300}
        color={COLORS.LIGHT_BLACK}
        text="WATCH NOW"
      />
    </View>
  );

  const Metadata = (
    <View>
      <ButtonIcon
        onClick={navigateBack}
        icon={ICONS_IMAGES.BACK_IMAGE}
        width={112}
        height={64}
        size={48}
        radius={300}
        color={COLORS.LIGHT_BLACK}
      />
      <Text style={detailStyle.textSmall}>{details.genre}</Text>
      <Text style={detailStyle.textSmall}>
        {details.duration} {isTVShow ? 'Seasons' : 'min'}
      </Text>
      <View style={detailStyle.inRow}>
        <Text style={detailStyle.textSmall}>
          {details.country} - {details.release_date?.split('-')[0]} - PG - IMDb:{' '}
          {details.rating?.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{uri: imageUrl}}
      style={detailStyle.page}
      resizeMode="cover">
      <View style={detailStyle.overlay}>
        <View style={[detailStyle.inColumn, detailStyle.body]}>
          {Metadata}
          <View style={[detailStyle.inRow, {marginTop: 20}]}>
            <Image source={{uri: posterUrl}} style={detailStyle.vebImage} />
            <View style={[detailStyle.inColumn, {paddingLeft: 70}]}>
              <Text style={[detailStyle.textBig, detailStyle.title]}>
                {details.title}
              </Text>
              {Description}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default React.memo(DetailPage);
