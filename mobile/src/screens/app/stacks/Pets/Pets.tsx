import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import Banner from "../../../../components/Banner/Banner";
import { COLORS, PETS_CATEGORIES } from "../../../../constants";
import { useGetPetsByCategoryQuery } from "../../../../graphql/generated/graphql";
import { styles } from "../../../../styles";
import { PetCategory } from "../../../../components";

const Pets: React.FunctionComponent<MarketNavProps<"Pets">> = ({
  navigation,
}) => {
  const [{ fetching, data }, refetch] = useGetPetsByCategoryQuery({
    variables: {
      input: {
        category: "DOGS",
      },
    },
  });

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
          key={category}
          subtitle={`All ${category.toLowerCase()} in the market.`}
        />
      ))}
    </ScrollView>
  );
};

export default Pets;
