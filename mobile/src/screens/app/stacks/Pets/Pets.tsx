import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import Banner from "../../../../components/Banner/Banner";
import { COLORS } from "../../../../constants";
import { useGetPetsByCategoryQuery } from "../../../../graphql/generated/graphql";
import { styles } from "../../../../styles";

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

      <Text style={[styles.p]}>
        {JSON.stringify({ dogs: data?.getCategoryPets }, null, 2)}
      </Text>
    </ScrollView>
  );
};

export default Pets;
