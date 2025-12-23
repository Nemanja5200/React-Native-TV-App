import { Image, Pressable, Text, View } from "react-native";
import buttonStyles from "./buttonStyle";
import { COLORS } from "../../styles/Colors";
import { ButtonType } from "./buttonType";
import MaterialIcons from '@amazon-devices/react-native-vector-icons/MaterialIcons';
import { ICONS_IMAGES } from "../../constants/Assets";

const ButtonIcon = ({
  onClick,
  icon,
  size,
  color = COLORS.DARK_GREY,
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
      width: 40,
      height: 40,
      tintColor: COLORS.LIGHT_GREY, 
      resizeMode: 'contain',
    }}
  />
   
      )}

      {text && <Text style={styles.text}>{text}</Text>}
    </Pressable>
  );
};

export default ButtonIcon;
