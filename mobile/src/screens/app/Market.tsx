import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppDrawerNavProps, MarketParamList } from "../../params";
import Pets from "./stacks/Pets/Pets";
import Pet from "./stacks/Pet/Pet";
import { AntDesign } from "@expo/vector-icons";
import Chat from "./stacks/Chat/Chat";
import Chats from "./stacks/Chats/Chats";
import Profile from "./stacks/Profile/Profile";
import Notifications from "./stacks/Notifications/Notifications";

const Stack = createStackNavigator<MarketParamList>();
const Market: React.FunctionComponent<AppDrawerNavProps<"Market">> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerLeft: (props) => {
          return (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              activeOpacity={0.7}
              onPress={() => navigation.toggleDrawer()}
            >
              <AntDesign name="menuunfold" size={24} color="white" />
            </TouchableOpacity>
          );
        },
      });
    }

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="Pets"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pets" component={Pets} />
      <Stack.Screen name="Pet" component={Pet} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default Market;
