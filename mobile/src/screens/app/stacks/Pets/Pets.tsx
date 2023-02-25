import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import Banner from "../../../../components/Banner/Banner";

const Pets: React.FunctionComponent<MarketNavProps<"Pets">> = ({
  navigation,
}) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Banner />
    </ScrollView>
  );
};

export default Pets;
