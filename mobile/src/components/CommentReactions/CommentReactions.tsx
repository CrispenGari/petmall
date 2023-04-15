import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useReactToCommentMutation } from "../../graphql/generated/graphql";
import { COLORS } from "../../constants";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
interface Props {
  setReaction: React.Dispatch<React.SetStateAction<string>>;
  reaction?: string;
  commentId: string;
  sold: boolean;
}

const CommentReactions: React.FC<Props> = ({
  setReaction,
  reaction,
  commentId: id,
  sold,
}) => {
  const [, reactToComment] = useReactToCommentMutation();

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
          await reactToComment({
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
          await reactToComment({
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
          await reactToComment({
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
          await reactToComment({
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
          await reactToComment({
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

export default CommentReactions;

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
