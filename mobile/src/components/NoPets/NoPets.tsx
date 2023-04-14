import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";

interface Props {
  category: string;
}
const NoPets: React.FunctionComponent<Props> = ({ category }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: COLORS.primary,
        width: 180,
        height: 250,
        maxWidth: 180,
        marginRight: 10,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontFamily: FONTS.regular,
          textAlign: "center",
        }}
      >
        no {category.replace(/_/g, " ").toLowerCase()}s in the market.
      </Text>
    </View>
  );
};

export default NoPets;
