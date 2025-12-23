
import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/Colors";

const style = () => {
  return StyleSheet.create({
    body: {
      marginTop: 65,
      marginLeft: 69,
    },
    page: {
      flex: 1,
      flexDirection: "column",
    },
    overlay: {
      flex: 1,
      padding: 12,
      backgroundColor: COLORS.TRANSPARENT_BLACK,
    },
    title: { fontSize: 28, fontWeight: "bold" },
    textSmall: {
      height: 29,
      paddingTop: 8,
      fontSize: 20,
      color: COLORS.WHITE,
    },
    textBig: {
      height: 31,
      marginTop: 20,
      fontSize: 22,
      fontWeight: "bold",
      color: COLORS.WHITE,
    },
    overview: {
      fontSize: 22,
      maxWidth: 689,
      height: 240,
    },
    vebImage: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginTop: 12,
      height: 485,
      width: 325,
      borderRadius: 14,
    },
    inRow: {
      flexDirection: "row",
    },
    inColumn: {
      flexDirection: "column",
    },
  })
}

export default style