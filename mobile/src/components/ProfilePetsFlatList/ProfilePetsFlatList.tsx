import { View, Text } from "react-native";
import React from "react";
import { useGetUserQuery } from "../../graphql/generated/graphql";
import { COLORS, FONTS, PETS_CATEGORIES } from "../../constants";
import SelectDropdown from "react-native-select-dropdown";
import Pet from "../Pet/Pet";
import NoPets from "../NoPets/NoPets";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
interface Props {
  category: string;
  subtitle: string;
  userId: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  navigation: StackNavigationProp<MarketParamList, "Pets">;
}
const ProfilePetsFlatList: React.FC<Props> = ({
  category,
  subtitle,
  userId: id,
  navigation,
  setCategory,
}) => {
  const [{ data }] = useGetUserQuery({
    variables: { input: { id } },
  });

  if (!!!data?.user.pets || data.user.pets.length === 0)
    return (
      <View
        style={{
          backgroundColor: COLORS.main,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
          No pets in the market.
        </Text>
      </View>
    );
  return (
    <View style={{ padding: 10, backgroundColor: COLORS.main }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTS.regularBold,
              color: COLORS.white,
              fontSize: 20,
            }}
          >
            {category.replace(/_/g, " ")}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.white,
              fontSize: 16,
            }}
          >
            {subtitle.replace(/_/g, " ")}
          </Text>
        </View>
        <SelectDropdown
          data={["ALL PETS", ...PETS_CATEGORIES]}
          onSelect={(selectedItem, index) => {
            setCategory(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item.replace(/_/g, " ");
          }}
          buttonStyle={{
            borderColor: COLORS.secondary,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: COLORS.primary,
            width: 200,
            padding: 0,
            height: 35,
          }}
          buttonTextStyle={{
            color: COLORS.white,
            fontFamily: FONTS.regular,
            fontSize: 16,
          }}
          defaultButtonText={category.replace(/_/g, " ")}
          rowTextStyle={{}}
          rowStyle={{
            padding: 0,
            height: 40,
          }}
        />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {category === "ALL PETS" ? (
          data?.user
            .pets!.filter(Boolean)
            .map((pet) => (
              <Pet key={pet.id} pet={pet as any} navigation={navigation} />
            ))
        ) : data?.user.pets!.filter((pet) => pet.category === category)
            .length === 0 ? (
          <NoPets category={category} />
        ) : (
          data?.user
            .pets!.filter((pet) => pet.category === category)
            .map((pet) => (
              <Pet key={pet.id} pet={pet as any} navigation={navigation} />
            ))
        )}
      </View>
    </View>
  );
};

export default ProfilePetsFlatList;
