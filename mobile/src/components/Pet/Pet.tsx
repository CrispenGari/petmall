import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { PetType } from "../../graphql/generated/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { relativeTimeObject } from "../../constants";
import { FontAwesome, Foundation } from "@expo/vector-icons";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  pet: PetType;
}
const Pet: React.FunctionComponent<Props> = ({ pet }) => {
  const repliesCount: number =
    pet.comments
      ?.map((cmt) => cmt.replies?.length || 0)
      .reduce((a, b) => a + b, 0) || 0;
  const commentCount: number = pet.comments?.length || 0;
  return (
    <TouchableOpacity
      style={{
        width: 180,
        minWidth: 180,
        height: 280,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 5,
        margin: 5,
      }}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
        }}
      >
        {pet.name}
      </Text>
      <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
        {pet.age} weeks • {pet.gender.toLowerCase()} •{" "}
        {dayjs(new Date(Number(pet.createdAt))).fromNow()} ago
      </Text>
      <Image
        source={{
          uri: pet.image.replace(
            "127.0.0.1:3001",
            "c2e4-102-66-82-42.ngrok-free.app"
          ),
        }}
        style={{
          width: "100%",
          flex: 1,
          borderRadius: 5,
          marginVertical: 3,
          resizeMode: "cover",
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
        }}
      >
        R {pet.price}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 5,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Foundation name="heart" size={16} color="white" />
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.white,
              marginLeft: 4,
            }}
          >
            {pet.reactions?.length ?? 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome name="comments" size={16} color="white" />
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.white,
              marginLeft: 4,
            }}
          >
            {repliesCount + commentCount}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Image
          source={{
            uri: !!pet.seller?.avatar
              ? pet.seller.avatar.replace(
                  "127.0.0.1:3001",
                  "c2e4-102-66-82-42.ngrok-free.app"
                )
              : Image.resolveAssetSource(require("../../../assets/profile.png"))
                  .uri,
          }}
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            alignSelf: "flex-end",
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Pet;
