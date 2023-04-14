import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
export const useDevice = () => {
  return {
    isIpad: !(height / width > 1.6),
  };
};
