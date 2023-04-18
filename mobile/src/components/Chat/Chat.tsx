import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import {
  ChatType,
  useDeleteChatMutation,
} from "../../graphql/generated/graphql";
import {
  COLORS,
  FONTS,
  ngrokDomain,
  relativeTimeObject,
} from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { encodeId } from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  chat: ChatType;
  navigation: StackNavigationProp<MarketParamList, "Chats">;
}

const Chat: React.FunctionComponent<Props> = ({ chat, navigation }) => {
  const { user: me } = useSelector((state: StateType) => state);
  const [, deleteChat] = useDeleteChatMutation();
  const lastMessage = chat.messages
    ? chat.messages[chat.messages.length - 1]
    : undefined;
  const deleteChatHandler = async () => {
    await deleteChat({ input: { id: chat.id } });
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: 5,
        marginBottom: 2,
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Pet", { petId: encodeId(chat.pet?.id || "") })
        }
      >
        <Image
          source={{
            uri: !!chat.pet?.image
              ? chat.pet.image.replace("127.0.0.1:3001", ngrokDomain)
              : Image.resolveAssetSource(require("../../../assets/profile.png"))
                  .uri,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 5,
            marginVertical: 3,
            resizeMode: "cover",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, marginHorizontal: 5 }}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Chat", { chatId: encodeId(chat.id) })
        }
      >
        <Text
          style={{
            fontFamily: FONTS.regularBold,
            fontSize: 20,
            color: COLORS.white,
          }}
        >
          {chat.chatTitle}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 16,
            color: COLORS.white,
          }}
        >
          {lastMessage?.senderId === me?.id && "you: "}
          {!!lastMessage
            ? lastMessage.message
            : "no messages in this chat yet"}{" "}
        </Text>
        {lastMessage?.senderId ===
        me?.id ? null : lastMessage?.opened ? null : (
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: COLORS.tertiary,
              borderRadius: 10,
              position: "absolute",
              right: 10,
              top: 5,
            }}
          />
        )}
        <View style={{}}>
          <Text
            style={{ fontFamily: FONTS.regular, fontSize: 15, color: "gray" }}
          >
            {dayjs(new Date(Number(lastMessage?.createdAt ?? ""))).fromNow()}{" "}
            ago
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          justifyContent: "center",
          alignItems: "center",
          minWidth: 50,
          backgroundColor: COLORS.tertiary,
          borderRadius: 5,
        }}
        onPress={deleteChatHandler}
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
