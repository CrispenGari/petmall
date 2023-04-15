import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useReactToPetMutation } from "../../graphql/generated/graphql";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../constants";
interface Props {
  setReaction: React.Dispatch<React.SetStateAction<string>>;
  reaction?: string;
  petId: string;
  sold: boolean;
}
const Reactions: React.FunctionComponent<Props> = ({
  reaction,
  setReaction,
  petId: id,
  sold,
}) => {
  const [, reactToPet] = useReactToPetMutation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.reaction__button,
          {
            backgroundColor:
              reaction === "LIKE" ? COLORS.tertiary : COLORS.main,
          },
        ]}
        onPress={async () => {
          if (sold) return;
          await reactToPet({
            input: {
              id,
              reaction: "LIKE",
            },
          });
          setReaction("LIKE");
        }}
      >
        <AntDesign name="like1" size={16} color={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.reaction__button,
          {
            backgroundColor:
              reaction === "LOVE" ? COLORS.tertiary : COLORS.main,
          },
        ]}
        onPress={async () => {
          if (sold) return;
          await reactToPet({
            input: {
              id,
              reaction: "LOVE",
            },
          });
          setReaction("LOVE");
        }}
      >
        <Entypo name="heart" size={16} color={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.reaction__button,
          {
            backgroundColor:
              reaction === "OFFER_LOVE" ? COLORS.tertiary : COLORS.main,
          },
        ]}
        onPress={async () => {
          if (sold) return;
          await reactToPet({
            input: {
              id,
              reaction: "OFFER_LOVE",
            },
          });
          setReaction("OFFER_LOVE");
        }}
      >
        <FontAwesome5
          name="hand-holding-heart"
          size={16}
          color={COLORS.white}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.reaction__button,
          {
            backgroundColor:
              reaction === "OFFER_MONEY" ? COLORS.tertiary : COLORS.main,
          },
        ]}
        activeOpacity={0.7}
        onPress={async () => {
          if (sold) return;
          await reactToPet({
            input: {
              id,
              reaction: "OFFER_MONEY",
            },
          });
          setReaction("OFFER_MONEY");
        }}
      >
        <FontAwesome5 name="hand-holding-usd" size={16} color={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.reaction__button,
          {
            backgroundColor:
              reaction === "DISLIKE" ? COLORS.tertiary : COLORS.main,
          },
        ]}
        activeOpacity={0.7}
        onPress={async () => {
          if (sold) return;
          await reactToPet({
            input: {
              id,
              reaction: "DISLIKE",
            },
          });
          setReaction("DISLIKE");
        }}
      >
        <AntDesign name="dislike1" size={16} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Reactions;

const styles = StyleSheet.create({
  reaction__button: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 3,
    borderRadius: 35,
  },
});
