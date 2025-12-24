import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import data from './detailType';
import style from './style';
import ButtonIcon from '../../components/button/ButtonIcon';
import {ICONS_IMAGES} from '../../constants/Assets';
import {COLORS} from '../../styles/Colors';
import {EXPO_PUBLIC_URL_API} from '@env';
import Layout from '../../components/Layout';
import {useNavigation} from '@amazon-devices/react-navigation__native';
const DetailPage = () => {
  const detailSyle = style();

  const imageUrl = `${EXPO_PUBLIC_URL_API}${data.poster_path}`;
  const genres = data.genres.map((e) => e.name).join(', ');
  const releaseDate = data.release_date.split('-')[0];
  const country = Array.isArray(data.origin_country)
    ? data.origin_country.join(', ')
    : data.origin_country;

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const Description = (
    <View style={detailSyle.inColumn}>
      <Text
        style={[detailSyle.textBig, detailSyle.overview]}
        numberOfLines={7}
        ellipsizeMode="tail">
        {data.overview}
      </Text>
      <ButtonIcon
        hasTVPreferredFocus={true}
        onClick={() => {}}
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
        onClick={handleBack}
        icon={ICONS_IMAGES.BACK_IMAGE}
        width={112}
        height={64}
        size={48}
        radius={300}
        color={COLORS.LIGHT_BLACK}
      />
      <Text style={detailSyle.textSmall}>{genres}</Text>
      <Text style={detailSyle.textSmall}>{data.runtime} min</Text>
      <View style={[detailSyle.inRow]}>
        <Text style={detailSyle.textSmall}>
          {country} - {releaseDate} - {data.adult ? 'G' : 'PG'} - IMDb:{' '}
          {data.vote_average.toFixed(2)}{' '}
        </Text>
      </View>
    </View>
  );
  return (
    <ImageBackground
      source={{uri: imageUrl}}
      style={detailSyle.page}
      resizeMode="cover">
      <Layout showHeader={false}>
        <View style={detailSyle.overlay}>
          <View style={[detailSyle.inColumn, detailSyle.body]}>
            {Metadata}
            <View style={[detailSyle.inRow, {marginTop: 20}]}>
              <Image
                source={{uri: imageUrl}}
                style={detailSyle.vebImage}></Image>
              <View style={[detailSyle.inColumn, {paddingLeft: 70}]}>
                <Text style={[detailSyle.textBig, detailSyle.title]}>
                  {data.title}
                </Text>
                {Description}
              </View>
            </View>
          </View>
        </View>
      </Layout>
    </ImageBackground>
  );
};
export default React.memo(DetailPage);
