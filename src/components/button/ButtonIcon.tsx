import { Image, Pressable, Text, View } from "react-native";
import buttonStyles from "./buttonStyle";
import { COLORS } from "../../styles/Colors";
import { ButtonType } from "./buttonType";

const ButtonIcon = ({
  onClick,
  icon,
  size,
  color = COLORS.WHITE,
  text,
  width,
  height,
  radius = 6,
}: ButtonType) => {
  const styles = buttonStyles();

  return (
    <Pressable
      onPress={onClick}
      style={[
        styles.buttonIcon,
        {
          width,
          height,
          backgroundColor: color,
          borderRadius: radius,
        },
      ]}
    >
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
    </Pressable>
  );
};

export default ButtonIcon;
