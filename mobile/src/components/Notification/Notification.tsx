import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { COLORS, FONTS, relativeTimeObject } from "../../constants";
import {
  NotificationType,
  useDeleteNotificationMutation,
  useMarkNotificationAsReadMutation,
  useMarkNotificationAsUnReadMutation,
} from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

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
  const [, open] = useMarkNotificationAsReadMutation();
  const [, close] = useMarkNotificationAsUnReadMutation();
  const [, deleteNotification] = useDeleteNotificationMutation();
  const swipeableRef = React.useRef<Swipeable | undefined>();
  const openNotification = async () => {
    if (!notification.read) {
      await open({ input: { id: notification.id } });
    }
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  const readNotificationAndOpen = async () => {
    if (!notification.read) {
      await open({ input: { id: notification.id } });
    }
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
    if (!!notification.petId) {
      navigation.navigate("Pet", { petId: encodeId(notification.petId) });
    }
  };

  const unOpenHandler = async () => {
    if (notification.read) {
      await close({ input: { id: notification.id } });
    }
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const deleteNotificationHandler = async () => {
    await deleteNotification({
      input: { id: notification.id },
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
              onPress={deleteNotificationHandler}
            >
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
            {!!!notification.read ? (
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
                onPress={openNotification}
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
                onPress={unOpenHandler}
              >
                <Ionicons name="ios-mail-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
          </>
        );
      }}
    >
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
          style={{
            fontFamily: FONTS.regular,
            fontSize: 16,
            color: COLORS.white,
          }}
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
    </Swipeable>
  );
};

export default Notification;
