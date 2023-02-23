import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppDrawerNavProps, MarketParamList } from "../../params";
import Pets from "./stacks/Pets/Pets";
import Pet from "./stacks/Pet/Pet";
import { AntDesign } from "@expo/vector-icons";

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
    </Stack.Navigator>
  );
};

export default Market;
