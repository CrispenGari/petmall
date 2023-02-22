import { Dimensions } from "react-native";

export const constants = {
  SET_DUID: "SET_DUID",
};
export const url = "https://f3d0-197-98-127-119.ngrok.io/graphql";

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};

export const TOKEN_KEY: string = "uk";
export const COLORS = {
  main: "#082032",
  primary: "#2c394b",
  secondary: "#334756",
  tertiary: "#ff4c29",
  white: "#fffff",
  red: "#FF3953",
};

export const SCREEN_WIDTH: number = Dimensions.get("screen").width;
export const SCREEN_HEIGHT: number = Dimensions.get("screen").height;

export const Fonts = {
  NunitoItalic: require("../../assets/fonts/Nunito-Italic.ttf"),
  NunitoRegular: require("../../assets/fonts/Nunito-Regular.ttf"),
  NunitoBold: require("../../assets/fonts/Nunito-Bold.ttf"),
  NunitoBoldItalic: require("../../assets/fonts/Nunito-BoldItalic.ttf"),
};

export const FONTS = {
  regular: "NunitoRegular",
  italic: "NunitoItalic",
  italicBold: "NunitoBoldItalic",
  regularBold: "NunitoBold",
};
