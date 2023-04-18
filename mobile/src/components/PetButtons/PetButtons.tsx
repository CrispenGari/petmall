import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import {
  PetType,
  useMarkAsSoldMutation,
  useNewChatMutation,
} from "../../graphql/generated/graphql";

import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { encodeId } from "../../utils";
import { useMediaQuery } from "../../hooks";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  pet: PetType;
  navigation: StackNavigationProp<MarketParamList, "Pet">;
}
const PetButtons: React.FunctionComponent<Props> = ({ pet, navigation }) => {
  const { user } = useSelector((state: StateType) => state);
  const [{ fetching: marking }, markAsSold] = useMarkAsSoldMutation();
  const [{ fetching: sending, data }, newChat] = useNewChatMutation();

  const { dimension } = useMediaQuery();
  const [message, setMessage] = React.useState<string>(
    `Hey ${pet.seller?.firstName}, is this still available?`
  );
  const sendMessage = async () => {
    if (!!!message.trim()) return;
    await newChat({
      input: { message, userId: pet.seller?.id || "", petId: pet.id },
    });
    setMessage("");
  };
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.newChat.chatId) {
      navigation.navigate("Chat", { chatId: encodeId(data.newChat.chatId) });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const markAsSoldHandler = async () => {
    await markAsSold({ input: { id: pet.id } });
  };
  if (dimension.width < 768) {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-start",
          marginVertical: 10,
        }}
      >
        {user?.id !== pet.seller?.id ? (
          <>
            <CustomTextInput
              outerContainerStyles={{ flex: 1 }}
              text={message}
              onChangeText={(text) => setMessage(text)}
              multiline
              placeholder="Write a message to the seller..."
              containerStyles={{ padding: 5 }}
              inputStyle={{ margin: 0 }}
              numberOfLines={2}
              onSubmitEditing={sendMessage}
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
              onPress={sendMessage}
              disabled={pet.sold}
            >
              <Text
                style={[
                  styles.button__text,
                  {
                    fontFamily: FONTS.regularBold,
                    marginRight: sending ? 5 : 0,
                  },
                ]}
              >
                SEND
              </Text>
              {sending ? (
                <BoxIndicator color={COLORS.secondary} size={5} />
              ) : null}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.button,
                { backgroundColor: COLORS.main, flex: 1, marginRight: 10 },
              ]}
              onPress={() =>
                navigation.navigate("EditPet", {
                  petId: encodeId(pet.id),
                })
              }
            >
              <Text
                style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
              >
                EDIT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.button,
                { backgroundColor: COLORS.tertiary, flex: 1 },
              ]}
              onPress={markAsSoldHandler}
              disabled={pet.sold}
            >
              <Text
                style={[
                  styles.button__text,
                  {
                    fontFamily: FONTS.regularBold,
                    marginRight: marking ? 5 : 0,
                  },
                ]}
              >
                SOLD
              </Text>
              {marking ? (
                <BoxIndicator color={COLORS.secondary} size={5} />
              ) : null}
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 10,
      }}
      behavior={"padding"}
      keyboardVerticalOffset={130}
    >
      {user?.id !== pet.seller?.id ? (
        <>
          <CustomTextInput
            outerContainerStyles={{ flex: 1 }}
            text={message}
            onChangeText={(text) => setMessage(text)}
            multiline
            placeholder="Write a message to the seller..."
            containerStyles={{ padding: 5 }}
            inputStyle={{ margin: 0 }}
            numberOfLines={2}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={sendMessage}
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
            disabled={pet.sold || sending}
          >
            <Text
              style={[
                styles.button__text,
                { fontFamily: FONTS.regularBold, marginRight: sending ? 5 : 0 },
              ]}
            >
              SEND
            </Text>
            {sending ? (
              <BoxIndicator color={COLORS.secondary} size={5} />
            ) : null}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.button,
              { backgroundColor: COLORS.main, flex: 1, marginRight: 10 },
            ]}
            onPress={() =>
              navigation.navigate("EditPet", { petId: encodeId(pet.id) })
            }
          >
            <Text
              style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
            >
              EDIT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: COLORS.tertiary, flex: 1 },
            ]}
            onPress={markAsSoldHandler}
            disabled={pet.sold}
          >
            <Text
              style={[
                styles.button__text,
                { fontFamily: FONTS.regularBold, marginRight: marking ? 5 : 0 },
              ]}
            >
              SOLD
            </Text>
            {marking ? (
              <BoxIndicator color={COLORS.secondary} size={5} />
            ) : null}
          </TouchableOpacity>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default PetButtons;
