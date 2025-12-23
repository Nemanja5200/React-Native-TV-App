import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/Colors";

const buttonStyles = () =>
  StyleSheet.create({
    text: {
      fontSize: 24,
      color: COLORS.WHITE,
      fontWeight: "500",
      marginLeft: 16,
    },
    buttonIcon: {
      margin: 4,
      padding: 8,
      minWidth: 70,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });

export default buttonStyles;
