import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { LogBox, StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import { COLORS, Fonts } from "./src/constants";
import UrqlProvider from "./src/providers/UrqlProvider";
import Routes from "./src/routes/Routes";
import { BoxIndicator } from "./src/components";
import ReduxProvider from "./src/providers/ReduxProvider";
import React from "react";
import * as Notifications from "expo-notifications";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const PetMall = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.secondary,
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <BoxIndicator color={COLORS.main} size={20} />
      </View>
    );
  }
  return (
    <UrqlProvider>
      <StatusBar barStyle={"light-content"} />
      <ReduxProvider>
        <Routes />
      </ReduxProvider>
    </UrqlProvider>
  );
};

registerRootComponent(PetMall);
