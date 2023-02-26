import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import Banner from "../../../../components/Banner/Banner";
import { COLORS } from "../../../../constants";

const Pets: React.FunctionComponent<MarketNavProps<"Pets">> = ({
  navigation,
}) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.secondary }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Banner />
    </ScrollView>
  );
};

export default Pets;
