import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Popover from "react-native-popover-view";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import {
  COLORS,
  FONTS,
  ngrokDomain,
  relativeTimeObject,
} from "../../constants";
import { CommentType } from "../../graphql/generated/graphql";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { useDevice } from "../../hooks";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import ReactionsSummary from "../ReactionsSummary/ReactionsSummary";
import CommentReactions from "../CommentReactions/CommentReactions";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { encodeId } from "../../utils";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  comment: CommentType;
  setReplyTo: React.Dispatch<
    React.SetStateAction<
      | (CommentType & {
          parentCommentId: string;
        })
      | undefined
    >
  >;
  sold: boolean;
  navigation: StackNavigationProp<MarketParamList, "Pet">;
}
const Comment: React.FunctionComponent<Props> = ({
  comment,
  setReplyTo,
  sold,
  navigation,
}) => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <CommentChild
        parentCommentId={comment.id}
        comment={comment}
        withReply
        setReplyTo={setReplyTo}
        sold={sold}
        navigation={navigation}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        {comment.replies?.map((reply, index) => (
          <CommentChild
            parentCommentId={comment.id}
            comment={reply}
            key={index.toString()}
            withReply
            setReplyTo={setReplyTo}
            sold={sold}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

export default Comment;

const CommentChild: React.FunctionComponent<{
  comment: CommentType;
  withReply?: boolean;
  parentCommentId: string;
  setReplyTo: React.Dispatch<
    React.SetStateAction<
      | (CommentType & {
          parentCommentId: string;
        })
      | undefined
    >
  >;
  sold: boolean;
  navigation: StackNavigationProp<MarketParamList, "Pet">;
}> = ({
  comment,
  withReply,
  setReplyTo,
  parentCommentId,
  sold,
  navigation,
}) => {
  const [reaction, setReaction] = React.useState<string>("");
  const { user } = useSelector((state: StateType) => state);

  const { isIpad } = useDevice();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!comment.reactions) {
      const _reaction = comment.reactions.find(
        (reaction) => reaction.userId === user?.id
      );
      if (!!!_reaction) {
        setReaction("");
      } else {
        setReaction(_reaction.reaction);
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, comment]);

  return (
    <View
      style={{
        backgroundColor: COLORS.main,
        width: "100%",
        maxWidth: "70%",
        padding: 5,
        borderRadius: 10,
        marginTop: 5,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Profile", {
            userId: encodeId(comment.user?.id || ""),
          })
        }
      >
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.regularBold,
            fontSize: 16,
          }}
        >
          {comment.user?.firstName} {comment.user?.lastName}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginRight: 5 }}
          onPress={() =>
            navigation.navigate("Profile", {
              userId: encodeId(comment.user?.id || ""),
            })
          }
        >
          <Image
            source={{
              uri: !!comment.user?.avatar
                ? comment.user.avatar.replace("127.0.0.1:3001", ngrokDomain)
                : Image.resolveAssetSource(
                    require("../../../assets/profile.png")
                  ).uri,
            }}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              marginVertical: 3,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.white,
          }}
        >
          {comment.comment}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
      >
        {withReply && comment.user?.id !== user?.id ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.reaction__button,
              {
                padding: 3,
                marginRight: 10,
              },
            ]}
            onPress={() => {
              if (sold) return;
              setReplyTo!({
                ...comment,
                parentCommentId,
              });
            }}
          >
            <Entypo name="reply" size={16} color="white" />
          </TouchableOpacity>
        ) : null}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <AntDesign name="dislike1" size={16} color="black" />
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
                  <Entypo name="heart" size={16} color={COLORS.white} />
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
                    size={16}
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
                    size={16}
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
                  <AntDesign name="like1" size={16} color={COLORS.white} />
                </TouchableOpacity>
              )
            }
          >
            <CommentReactions
              sold={sold}
              commentId={comment.id}
              reaction={reaction}
              setReaction={setReaction}
            />
          </Popover>
          <Popover
            from={
              <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 5 }}>
                <Text style={{ fontFamily: FONTS.regularBold, color: "gray" }}>
                  {comment.reactions?.length || 0} reactions
                </Text>
              </TouchableOpacity>
            }
          >
            <ReactionsSummary reactions={comment.reactions || []} />
          </Popover>
          <Text style={{ color: "gray", fontFamily: FONTS.regular }}>
            {" • "}
            {dayjs(new Date(Number(comment.createdAt))).fromNow()} ago
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reaction__button: {
    width: 25,
    height: 25,
    padding: 3,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
});
