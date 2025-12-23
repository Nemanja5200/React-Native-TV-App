import { ImageSourcePropType } from "react-native";

export interface ButtonType {
  onClick: () => void;
  icon?: ImageSourcePropType;
  size: number;
  color?: string;
  text?: string;
  width: number;
  height?: number;
  radius?: number;
}