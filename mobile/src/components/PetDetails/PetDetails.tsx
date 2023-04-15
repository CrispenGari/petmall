import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Popover from "react-native-popover-view";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import {
  COLORS,
  FONTS,
  SCREEN_HEIGHT,
  ngrokDomain,
  relativeTimeObject,
} from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { PetType } from "../../graphql/generated/graphql";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import PetButtons from "../PetButtons/PetButtons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Reactions from "../Reactions/Reactions";
import ReactionsSummary from "../ReactionsSummary/ReactionsSummary";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  pet: PetType;
  reaction: string;
  setReaction: React.Dispatch<React.SetStateAction<string>>;
}
const PetDetails: React.FunctionComponent<Props> = ({
  pet,
  reaction,
  setReaction,
}) => {
  const repliesCount: number =
    pet.comments
      ?.map((cmt) => cmt.replies?.length || 0)
      .reduce((a, b) => a + b, 0) || 0;
  const commentCount: number = pet.comments?.length || 0;
  return (
    <View style={{ width: "100%", maxWidth: 500, height: SCREEN_HEIGHT * 0.8 }}>
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
        {pet.age} weeks • {pet.gender.toLowerCase()} • listed{" "}
        {dayjs(new Date(Number(pet.createdAt))).fromNow()} ago
      </Text>
      <Image
        source={{
          uri: pet.image.replace("127.0.0.1:3001", ngrokDomain),
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
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
        }}
      >
        {pet.description}
      </Text>
      <PetButtons pet={pet} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Popover
            from={
              reaction === "DISLIKE" ? (
                <TouchableOpacity
                  style={[
                    styles.reaction__button,
                    {
                      backgroundColor: !!reaction
                        ? COLORS.tertiary
                        : COLORS.secondary,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <AntDesign name="dislike1" size={20} color="black" />
                </TouchableOpacity>
              ) : reaction === "LOVE" ? (
                <TouchableOpacity
                  style={[
                    styles.reaction__button,
                    {
                      backgroundColor: !!reaction
                        ? COLORS.tertiary
                        : COLORS.secondary,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Entypo name="heart" size={20} color={COLORS.white} />
                </TouchableOpacity>
              ) : reaction === "OFFER_LOVE" ? (
                <TouchableOpacity
                  style={[
                    styles.reaction__button,
                    {
                      backgroundColor: !!reaction
                        ? COLORS.tertiary
                        : COLORS.secondary,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <FontAwesome5
                    name="hand-holding-heart"
                    size={20}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              ) : reaction === "OFFER_MONEY" ? (
                <TouchableOpacity
                  style={[
                    styles.reaction__button,
                    {
                      backgroundColor: !!reaction
                        ? COLORS.tertiary
                        : COLORS.secondary,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <FontAwesome5
                    name="hand-holding-usd"
                    size={20}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.reaction__button,
                    {
                      backgroundColor: !!reaction
                        ? COLORS.tertiary
                        : COLORS.secondary,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <AntDesign name="like1" size={20} color={COLORS.white} />
                </TouchableOpacity>
              )
            }
          >
            <Reactions
              petId={pet.id}
              reaction={reaction}
              sold={pet.sold}
              setReaction={setReaction}
            />
          </Popover>
          <Popover
            from={
              <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 5 }}>
                <Text
                  style={{ fontFamily: FONTS.regularBold, color: COLORS.white }}
                >
                  {pet.reactions?.length || 0} reactions
                </Text>
              </TouchableOpacity>
            }
          >
            <ReactionsSummary reactions={pet.reactions || []} />
          </Popover>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.reaction__button} disabled>
            <FontAwesome name="comments" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.white,
              marginLeft: 10,
              fontFamily: FONTS.regularBold,
            }}
          >
            {repliesCount + commentCount} comments
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  reaction__button: {
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
});
