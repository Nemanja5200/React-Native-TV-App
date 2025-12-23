import { Image, Pressable, Text, View } from "react-native";
import buttonStyles from "./buttonStyle";
import { COLORS } from "../../styles/Colors";
import { ButtonType } from "./buttonType";
import FocusableElement from "../FocusableElement";
import { useState } from "react";

const ButtonIcon = ({
  onClick,
  icon,
  size,
  color = COLORS.WHITE,
  text,
  width,
  height,
  radius = 6,
  hasTVPreferredFocus = false,
}: ButtonType) => {
  const styles = buttonStyles();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <FocusableElement hasTVPreferredFocus={hasTVPreferredFocus} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onPress={onClick} style={[
      styles.buttonIcon,
      {
        width,
        height,
        backgroundColor: isFocused ? COLORS.BORDER : color,
        borderRadius: radius,
      },
    ]}>

      {icon && (
        <Image
          source={icon}
          style={{
            width: size,
            height: size,
            tintColor: COLORS.WHITE,
            resizeMode: 'contain',
          }}
        />

      )}

      {text && <Text style={styles.text}>{text}</Text>}
    </FocusableElement>
  );
};

export default ButtonIcon;
