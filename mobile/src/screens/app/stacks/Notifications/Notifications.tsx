import { View, Text, ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import { COLORS, FONTS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { CustomTextInput, Notification } from "../../../../components";
import Divider from "../../../../components/Divider/Divider";
import { Feather } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

const Notifications: React.FunctionComponent<
  MarketNavProps<"Notifications">
> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <CustomTextInput
        placeholder="filter notifications"
        containerStyles={{}}
        outerContainerStyles={{
          maxWidth: 400,
          backgroundColor: COLORS.primary,
          margin: 10,
        }}
        text={filter}
        onChangeText={(text) => setFilter(text)}
        keyboardType="default"
        leftIcon={<Feather name="search" size={24} color="gray" />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 10, backgroundColor: COLORS.main, flex: 1 }}
      >
        <Divider title="Unread" />
        {notifications.notifications.filter(
          (notification) => !notification.read
        ).length === 0 ? (
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
          notifications.notifications
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
        {notifications.notifications.filter((notification) => notification.read)
          .length === 0 ? (
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
          notifications.notifications
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
