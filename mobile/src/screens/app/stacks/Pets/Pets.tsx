import { ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import Banner from "../../../../components/Banner/Banner";
import { COLORS, PETS_CATEGORIES } from "../../../../constants";
import { PetCategory } from "../../../../components";

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

      {PETS_CATEGORIES.map((category) => (
        <PetCategory
          title={category}
          navigation={navigation}
          key={category}
          subtitle={`All ${category.toLowerCase()} in the market.`}
        />
      ))}
    </ScrollView>
  );
};

export default Pets;
