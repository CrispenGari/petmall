import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MarketParamList } from "../../params";
import Pets from "./stacks/Pets/Pets";
import Pet from "./stacks/Pet/Pet";
import NewPet from "./stacks/NewPet/NewPet";

const Stack = createStackNavigator<MarketParamList>();
const Market = () => {
  return (
    <Stack.Navigator
      initialRouteName="Pets"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pets" component={Pets} />
      <Stack.Screen name="Pet" component={Pet} />
      <Stack.Screen name="NewPet" component={NewPet} />
    </Stack.Navigator>
  );
};

export default Market;
