import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppDrawerParamList } from "../params";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  VerifyEmail,
} from "../screens/auth";
import Market from "../screens/app/Market";
import { COLORS, FONTS, TOKEN_KEY } from "../constants";
import AppDrawer from "../components/AppDrawer/AppDrawer";
import { useDispatch, useSelector } from "react-redux";
import NewPet from "../screens/app/NewPet";
import { useLocationPermission } from "../hooks";
import * as Location from "expo-location";
import { StateType } from "../types";
import PreviewPet from "../screens/app/PreviewPet";
import { retrieve } from "../utils";
import SellerProfile from "../screens/app/SellerProfile";
import { View } from "react-native";
import { BoxIndicator } from "../components";
import { setLocation } from "../actions";
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const Routes = () => {
  const { user } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const { granted } = useLocationPermission();

  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && granted && !!user) {
      setLoading(true);
      (async () => {
        const location = await Location.getCurrentPositionAsync();
        dispatch(
          setLocation({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          })
        );
        setLoading(false);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [granted]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const jwt = await retrieve(TOKEN_KEY);
        console.log({ jwt });
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.secondary,
        }}
      >
        <BoxIndicator color={COLORS.main} size={20} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <AppDrawer props={props} />}
        initialRouteName="Market"
        screenOptions={({ route: { name } }) => ({
          headerStyle: {
            backgroundColor: COLORS.main,
            height: 100,
            elevation: 0,
            borderBottomColor: "transparent",
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: FONTS.regularBold,
            fontSize: 30,
            letterSpacing: 1,
          },
          drawerStyle: {
            backgroundColor: COLORS.main,
          },
          drawerItemStyle: {
            backgroundColor: COLORS.secondary,
          },
          drawerContentStyle: {
            padding: 0,
            margin: 0,
          },
          drawerHideStatusBarOnOpen: true,
          drawerType: "front",
        })}
      >
        <Drawer.Screen name="Market" component={Market} />
        <Drawer.Screen name="SellerProfile" component={SellerProfile} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="ResetPassword" component={ResetPassword} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        <Drawer.Screen name="VerifyEmail" component={VerifyEmail} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="NewPet" component={NewPet} />
        <Drawer.Screen name="PreviewPet" component={PreviewPet} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
