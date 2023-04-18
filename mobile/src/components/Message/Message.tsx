import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import {
  COLORS,
  FONTS,
  ngrokDomain,
  relativeTimeObject,
} from "../../constants";
import { MessageType } from "../../graphql/generated/graphql";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { encodeId } from "../../utils";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  message: MessageType;
  navigation: StackNavigationProp<MarketParamList, "Chat">;
}
const Message: React.FunctionComponent<Props> = ({ message, navigation }) => {
  const { user: me } = useSelector((state: StateType) => state);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        maxWidth: "80%",
        marginBottom: 3,
        alignSelf: me?.id === message.senderId ? "flex-end" : "flex-start",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Profile", { userId: encodeId(message.senderId) })
        }
      >
        <Image
          source={{
            uri: !!message.sender?.avatar
              ? message.sender.avatar.replace("127.0.0.1:3001", ngrokDomain)
              : Image.resolveAssetSource(require("../../../assets/profile.png"))
                  .uri,
          }}
          style={{
            width: 25,
            height: 25,
            borderRadius: 5,
            resizeMode: "cover",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          marginLeft: 5,
          padding: 5,
          backgroundColor:
            me?.id === message.senderId ? COLORS.main : COLORS.secondary,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontFamily: FONTS.regular,
          }}
        >
          {message.message}
        </Text>
        <View>
          <Text
            style={{
              color: "gray",
              fontSize: 14,
              fontFamily: FONTS.regular,
            }}
          >
            {me?.id === message.senderId ? "you" : message.sender?.firstName} •{" "}
            {dayjs(new Date(Number(message?.createdAt ?? ""))).fromNow()} ago
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Message;
