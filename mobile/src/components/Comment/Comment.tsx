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
}
const Comment: React.FunctionComponent<Props> = ({
  comment,
  setReplyTo,
  sold,
}) => {
  return (
    <View>
      <CommentChild
        parentCommentId={comment.id}
        comment={comment}
        withReply
        setReplyTo={setReplyTo}
        sold={sold}
      />
      <View style={{}}>
        {comment.replies?.map((reply, index) => (
          <CommentChild
            parentCommentId={comment.id}
            comment={reply}
            key={index.toString()}
            withReply
            setReplyTo={setReplyTo}
            sold={sold}
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
}> = ({ comment, withReply, setReplyTo, parentCommentId, sold }) => {
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
    <View style={{}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={
          () => {}
          // navigate(`/app/profile/${encodeId(comment.user?.id || "")}`)
        }
      >
        <Text>
          {comment.user?.firstName} {comment.user?.lastName}
        </Text>
      </TouchableOpacity>
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            () => {}
            // navigate(`/app/profile/${encodeId(comment.user?.id || "")}`)
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
              width: isIpad ? 100 : 50,
              height: isIpad ? 100 : 50,
              borderRadius: 5,
              marginVertical: 3,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <Text>{comment.comment}</Text>
      </View>
      <View style={{}}>
        {withReply && comment.user?.id !== user?.id ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (sold) return;
              setReplyTo!({
                ...comment,
                parentCommentId,
              });
            }}
          >
            <Entypo name="reply" size={24} color="black" />
          </TouchableOpacity>
        ) : null}
        <View style={{}}>
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
                <Text
                  style={{ fontFamily: FONTS.regularBold, color: COLORS.white }}
                >
                  {comment.reactions?.length || 0} reactions
                </Text>
              </TouchableOpacity>
            }
          >
            <ReactionsSummary reactions={comment.reactions || []} />
          </Popover>
          <Text>
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
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
});
