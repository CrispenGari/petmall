import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Swipeable } from "react-native-gesture-handler";
import {
  ChatType,
  useDeleteChatMutation,
  useMarkMessageAsUnReadMutation,
  useMarkMessagesAsReadMutation,
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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

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
  const swipeableRef = React.useRef<Swipeable | undefined>();

  const lastMessage = chat.messages
    ? chat.messages[chat.messages.length - 1]
    : undefined;

  const [{}, markAsUnRead] = useMarkMessageAsUnReadMutation();

  const [{}, markAsRead] = useMarkMessagesAsReadMutation();

  const deleteChatHandler = async () => {
    await deleteChat({ input: { id: chat.id } });

    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  const markAsReadHandler = async () => {
    await markAsRead({ input: { chatId: chat.id } });
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  const markAsUnReadHandler = async () => {
    await markAsUnRead({
      input: {
        chatId: chat.id,
        messageId: lastMessage?.id || "",
      },
    });
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  return (
    <Swipeable
      ref={swipeableRef as any}
      renderRightActions={(progress, dragX) => {
        return (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                justifyContent: "center",
                alignItems: "center",
                minWidth: 50,
                backgroundColor: COLORS.tertiary,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onPress={deleteChatHandler}
            >
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
            {!!!lastMessage?.opened ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 50,
                  backgroundColor: COLORS.secondary,
                  borderRadius: 5,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                onPress={markAsReadHandler}
              >
                <Ionicons name="mail-open-outline" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 50,
                  backgroundColor: COLORS.secondary,
                  borderRadius: 5,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                onPress={markAsUnReadHandler}
              >
                <Ionicons name="ios-mail-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
          </>
        );
      }}
    >
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
                : Image.resolveAssetSource(
                    require("../../../assets/profile.png")
                  ).uri,
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
      </View>
    </Swipeable>
  );
};

export default Chat;
