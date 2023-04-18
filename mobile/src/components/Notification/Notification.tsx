import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { COLORS, FONTS, relativeTimeObject } from "../../constants";
import {
  NotificationType,
  useMarkNotificationAsReadMutation,
} from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  notification: NotificationType;
  navigation: StackNavigationProp<MarketParamList, "Notifications">;
}
const Notification: React.FC<Props> = ({ notification, navigation }) => {
  const [, markAsRead] = useMarkNotificationAsReadMutation();
  const readNotificationAndOpen = async () => {
    if (!notification.read) {
      await markAsRead({ input: { id: notification.id } });
    }
    if (!!notification.petId) {
      navigation.navigate("Pet", { petId: encodeId(notification.petId) });
    }
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        padding: 5,
        marginBottom: 2,
        borderRadius: 5,
      }}
      activeOpacity={0.7}
      onPress={readNotificationAndOpen}
    >
      <Text
        style={{
          fontFamily: FONTS.regularBold,
          fontSize: 20,
          color: COLORS.white,
        }}
      >
        {notification.title}
      </Text>
      <Text
        style={{ fontFamily: FONTS.regular, fontSize: 16, color: COLORS.white }}
      >
        {notification.notification}
      </Text>
      <View style={{}}>
        <Text
          style={{ fontFamily: FONTS.regular, fontSize: 15, color: "gray" }}
        >
          {dayjs(new Date(Number(notification.createdAt))).fromNow()} ago
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
