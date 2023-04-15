import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
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
  const [{ fetching: loading }, replyToComment] = useReplyCommentMutation();
  const [comment, setComment] = React.useState<string>("");
  const { dimension } = useMediaQuery();
  const { keyboardHeight } = useKeyboardDimension();
  const onSubmit = async () => {
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
        style={{
          backgroundColor: COLORS.secondary,
          maxHeight: 500,
          padding: 10,
          height: 500,
        }}
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
      </ScrollView>

      <KeyboardAvoidingView
        behavior={dimension.width >= 768 ? "position" : "padding"}
        keyboardVerticalOffset={
          dimension.width >= 768 ? 130 : keyboardHeight + 200
        }
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
            placeholder="write a comment about this pet.."
            numberOfLines={4}
            multiline
            inputStyle={{ height: 50 }}
            containerStyles={{ padding: 0 }}
            outerContainerStyles={{ flex: 1 }}
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
            disabled={pet.sold}
          >
            <Text
              style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
            >
              SEND
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PetComments;
