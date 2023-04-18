import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useRef } from "react";
import {
  PetType,
  CommentType,
  useReplyCommentMutation,
  useCommentToPetMutation,
} from "../../graphql/generated/graphql";
import { COLORS, FONTS } from "../../constants";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { styles } from "../../styles";
import { AntDesign } from "@expo/vector-icons";
import Comment from "../Comment/Comment";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { useKeyboardDimension, useMediaQuery } from "../../hooks";
import BoxIndicator from "../BoxIndicator/BoxIndicator";

interface Props {
  pet: PetType;
  setReplyTo: React.Dispatch<
    React.SetStateAction<
      | (CommentType & {
          parentCommentId: string;
        })
      | undefined
    >
  >;
  replyTo:
    | (CommentType & {
        parentCommentId: string;
      })
    | undefined;
  petId: string;
  navigation: StackNavigationProp<MarketParamList, "Pet">;
}
const PetComments: React.FunctionComponent<Props> = ({
  replyTo,
  petId,
  pet,
  setReplyTo,
  navigation,
}) => {
  const [{ fetching }, commentToPet] = useCommentToPetMutation();
  const scrollViewRef = useRef<React.LegacyRef<ScrollView> | any>();
  const [{}, replyToComment] = useReplyCommentMutation();
  const [comment, setComment] = React.useState<string>("");
  const { keyboardHeight } = useKeyboardDimension();
  const { dimension } = useMediaQuery();
  const commentToPetOrReplyToComment = async () => {
    if (!!!comment.trim()) return;
    if (!!replyTo) {
      await replyToComment({
        input: {
          comment,
          id: replyTo.parentCommentId,
          userId: replyTo.user?.id || "",
        },
      });
    } else {
      await commentToPet({
        input: {
          id: petId,
          comment,
        },
      });
    }
    setComment("");
    setReplyTo(undefined);
  };
  return (
    <View style={{ flex: 1, marginLeft: 5 }}>
      <Text
        style={{
          fontFamily: FONTS.regularBold,
          fontSize: 20,
          color: COLORS.white,
        }}
      >
        Reviews about {pet.name}
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: COLORS.secondary,
          maxHeight: 500,
          padding: 10,
          height: 500,
          minHeight: 500,
        }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {!!!pet.comments?.length ? (
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTS.regular,
              color: COLORS.white,
              padding: 20,
            }}
          >
            No comments about {pet.name}
          </Text>
        ) : (
          pet.comments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment as any}
              setReplyTo={setReplyTo}
              sold={pet.sold}
              navigation={navigation}
            />
          ))
        )}
        <View
          style={{
            height:
              dimension.width < 768
                ? keyboardHeight + 130
                : keyboardHeight - 50,
          }}
        />
      </ScrollView>
      {dimension.width < 768 ? (
        <SafeAreaView
          style={{
            alignItems: "flex-start",
            justifyContent: "space-between",
            position: "absolute",
            bottom: keyboardHeight + 10,
            width: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          {!!replyTo ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
                replying to: @{replyTo.user?.firstName} on "{replyTo.comment}"
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: COLORS.tertiary,
                  borderRadius: 20,
                }}
                onPress={() => setReplyTo(undefined)}
              >
                <AntDesign name="close" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 3,
            }}
          >
            <CustomTextInput
              placeholder={
                !!!replyTo
                  ? "Write a comment about this pet..."
                  : `replying to: @${replyTo.user?.firstName} on "${replyTo.comment}"`
              }
              numberOfLines={4}
              multiline={true}
              inputStyle={{ height: 50 }}
              containerStyles={{ padding: 0 }}
              outerContainerStyles={{ flex: 1 }}
              onSubmitEditing={commentToPetOrReplyToComment}
              text={comment}
              onChangeText={(text) => setComment(text)}
              onFocus={() => {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.main,
                  width: 100,
                  borderRadius: 5,
                  marginTop: 0,
                  marginLeft: 5,
                },
              ]}
              disabled={pet.sold || !!!comment}
              onPress={commentToPetOrReplyToComment}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.button__text,
                  {
                    fontFamily: FONTS.regularBold,
                    marginRight: fetching ? 3 : 0,
                  },
                ]}
              >
                COMMENT
              </Text>
              {fetching ? (
                <BoxIndicator color={COLORS.secondary} size={5} />
              ) : null}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <KeyboardAvoidingView
          behavior={"position"}
          keyboardVerticalOffset={130}
          style={{ width: "100%", marginVertical: 10 }}
        >
          {!!replyTo ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
                replying to: @{replyTo.user?.firstName} on "{replyTo.comment}"
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: COLORS.tertiary,
                  borderRadius: 20,
                }}
                onPress={() => setReplyTo(undefined)}
              >
                <AntDesign name="close" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 3,
            }}
          >
            <CustomTextInput
              placeholder={
                !!!replyTo
                  ? "Write a comment about this pet..."
                  : `replying to: @${replyTo.user?.firstName} on "${replyTo.comment}"`
              }
              numberOfLines={4}
              multiline={true}
              inputStyle={{ height: 50 }}
              containerStyles={{ padding: 0 }}
              outerContainerStyles={{ flex: 1 }}
              onSubmitEditing={commentToPetOrReplyToComment}
              text={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.main,
                  width: 100,
                  borderRadius: 5,
                  marginTop: 0,
                  marginLeft: 5,
                },
              ]}
              disabled={pet.sold || !!!comment}
              onPress={commentToPetOrReplyToComment}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.button__text,
                  {
                    fontFamily: FONTS.regularBold,
                    marginRight: fetching ? 3 : 0,
                  },
                ]}
              >
                COMMENT
              </Text>
              {fetching ? (
                <BoxIndicator color={COLORS.secondary} size={5} />
              ) : null}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default PetComments;
