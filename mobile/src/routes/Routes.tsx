import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppDrawerParamList } from "../params";
import { Login, Register } from "../screens/auth";
import Market from "../screens/app/Market";
import { COLORS, FONTS } from "../constants";
import { TouchableOpacity } from "react-native";
const Drawer = createDrawerNavigator<AppDrawerParamList>();
const Routes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Market"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.main,
            height: 100,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontFamily: FONTS.regularBold,
          },
          drawerStyle: {
            backgroundColor: COLORS.primary,
          },
          drawerItemStyle: {
            backgroundColor: COLORS.primary,
          },
          drawerActiveBackgroundColor: COLORS.main,
          drawerLabelStyle: {
            color: COLORS.white,
          },
          // drawerLabel: (props) => {
          //   return (
          //     <TouchableOpacity>
          //       <Text>Hello</Text>
          //     </TouchableOpacity>
          //   );
          // },
        }}
      >
        <Drawer.Screen name="Market" component={Market} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
