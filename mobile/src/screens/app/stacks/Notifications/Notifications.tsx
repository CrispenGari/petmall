import { View, Text, ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import { COLORS, FONTS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { CustomTextInput, Notification } from "../../../../components";
import Divider from "../../../../components/Divider/Divider";
import { Feather } from "@expo/vector-icons";

const Notifications: React.FunctionComponent<
  MarketNavProps<"Notifications">
> = ({ navigation }) => {
  const [filter, setFilter] = React.useState<string>("");
  const { notifications, user } = useSelector((state: StateType) => state);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user?.emailVerified && !!!user?.isLoggedIn) {
      navigation.replace("Pets");
    }
    return () => {
      mounted = false;
    };
  }, [navigation, user]);

  const [_notifications, set_Notifications] = React.useState(
    notifications.notifications
  );

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!filter) {
        set_Notifications(
          notifications.notifications.filter((notification) =>
            notification.title
              .toLowerCase()
              .includes(filter.trim().toLowerCase())
          )
        );
      } else {
        set_Notifications(notifications.notifications.filter(Boolean));
      }
    }
    return () => {
      mounted = false;
    };
  }, [filter, notifications]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ padding: 10 }}>
        <CustomTextInput
          placeholder="filter notifications"
          outerContainerStyles={{
            maxWidth: 400,
            backgroundColor: COLORS.primary,
          }}
          text={filter}
          onChangeText={(text) => setFilter(text)}
          keyboardType="default"
          leftIcon={<Feather name="search" size={24} color="gray" />}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 10, backgroundColor: COLORS.main, flex: 1 }}
      >
        <Divider title="Unread" />
        {_notifications.filter((notification) => !notification.read).length ===
        0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
              No new notifications.
            </Text>
          </View>
        ) : (
          _notifications
            .filter((notification) => !notification.read)
            .map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                navigation={navigation}
              />
            ))
        )}
        <Divider title="Read" />
        {_notifications.filter((notification) => notification.read).length ===
        0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
              No old notifications.
            </Text>
          </View>
        ) : (
          _notifications
            .filter((notification) => notification.read)
            .map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                navigation={navigation}
              />
            ))
        )}
      </ScrollView>
    </View>
  );
};

export default Notifications;
