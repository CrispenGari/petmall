import { View, Text } from "react-native";
import React from "react";
import { useReactToPetMutation } from "../../graphql/generated/graphql";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        activeOpacity={0.7}
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
        <AntDesign name="like1" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
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
        <Entypo name="heart" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
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
        <FontAwesome5 name="hand-holding-heart" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
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
        <FontAwesome5 name="hand-holding-usd" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
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
        <AntDesign name="dislike1" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Reactions;
