import React from "react"
import { Image, ImageBackground, Text, View } from "react-native"
import style from "./style"
import ButtonIcon from "../../components/button/ButtonIcon"
import { ICONS_IMAGES, IMAGES } from "../../constants/Assets"
import { COLORS } from "../../styles/Colors"
import { useDetails } from "../../hooks/useDetails"

const DetailPage = () => {
  const detailSyle = style();
    const { data } = useDetails("425274")
  const genres = data.genres.map((e) => e).join(", ");
  const releaseDate = data.releaseDate.split("-")[0];
  
  const Description = (
    <View style={detailSyle.inColumn}>
      <Text style={[detailSyle.textBig, detailSyle.overview]} numberOfLines={7} ellipsizeMode="tail">
        {data.overview}
      </Text>
      <ButtonIcon hasTVPreferredFocus={true} onClick={() => { }} icon={ICONS_IMAGES.PLAY_IMAGE} width={286} height={78} size={15} radius={300} color={COLORS.LIGHT_BLACK} text="WATCH NOW" />
    </View>
  );
  const Header = (
    <View>
      <ButtonIcon onClick={() => { }} icon={ICONS_IMAGES.BACK_IMAGE} width={112} height={64} size={48} radius={300} color={COLORS.LIGHT_BLACK} />
      <Text style={detailSyle.textSmall}>{genres}</Text>
      <Text style={detailSyle.textSmall}>{data.runtime} min</Text>
      <View style={[detailSyle.inRow,]}>
        <Text style={detailSyle.textSmall}>{data.language.toUpperCase()} - {releaseDate} - {data.status ? "G" : "PG"} - IMDb: {data.voteAverage.toFixed(2)} </Text>
      </View>
    </View>
  );
  return (
    <ImageBackground source={data.posterUrl?{ uri: data.posterUrl} :IMAGES.Logo } style={detailSyle.page} resizeMode="cover">
      <View style={detailSyle.overlay}>
        <View style={[detailSyle.inColumn, detailSyle.body]}>
          {Header}
          <View style={[detailSyle.inRow, { marginTop: 20 }]}>
            <Image source={data.posterUrl?{ uri: data.posterUrl} :IMAGES.Logo} style={detailSyle.vebImage}></Image>
            <View style={[detailSyle.inColumn, { paddingLeft: 70 }]}>
              <Text style={[detailSyle.textBig, detailSyle.title]}>{data.title}</Text>
              {Description}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>


  )
}
export default React.memo(DetailPage)