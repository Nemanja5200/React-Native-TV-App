import React from "react"
import { Text, View } from "react-native"
import data from "./detailType"
import style from "./style"
import ButtonIcon from "../../components/button/ButtonIcon"
import { ICONS_IMAGES } from "../../constants/Assets"
import { COLORS } from "../../styles/Colors"
const DetailPage=()=>{
const detailSyle=style()

    return (
    <View>
         <ButtonIcon onClick={()=>{}} icon={ICONS_IMAGES.BACK_IMAGE} width={112} height={64} size={40} radius={300} color={COLORS.LIGHT_BLACK}/>
     <Text style={detailSyle.text}>{data.title}</Text>
    </View>
    
   )
}
export default React.memo(DetailPage)