import { View, Text } from "react-native";
import React from "react";
import { useGetPetsByCategoryQuery } from "../../graphql/generated/graphql";
import NoPets from "../NoPets/NoPets";
import Pet from "../Pet/Pet";
import { COLORS, FONTS } from "../../constants";
import { FlatList } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { useDevice } from "../../hooks";

interface Props {
  title: string;
  subtitle: string;
  navigation: StackNavigationProp<MarketParamList, "Pets">;
}
const PetCategory: React.FC<Props> = ({ subtitle, title, navigation }) => {
  const { isIpad } = useDevice();
  const [{ data }] = useGetPetsByCategoryQuery({
    variables: {
      input: {
        category: title.toUpperCase(),
      },
    },
  });
  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        marginBottom: 10,
        padding: isIpad ? 10 : 5,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
          fontSize: 20,
        }}
      >
        {title.replace(/_/g, " ")}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          color: COLORS.white,
          fontSize: 17,
        }}
      >
        {subtitle.replace(/_/g, " ")}
      </Text>
      {data?.getCategoryPets.count === 0 ? (
        <NoPets category={title} />
      ) : !!data?.getCategoryPets.pets ? (
        <FlatList
          horizontal={true}
          data={data.getCategoryPets.pets}
          keyExtractor={({ id }) => id}
          renderItem={({ item: pet }) => (
            <Pet pet={pet as any} navigation={navigation} />
          )}
        />
      ) : (
        <NoPets category={"no"} />
      )}
    </View>
  );
};

export default PetCategory;
