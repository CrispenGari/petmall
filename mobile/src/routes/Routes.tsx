import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppDrawerParamList } from "../params";
import { Login, Register } from "../screens/auth";
import Market from "../screens/app/Market";
import { COLORS, FONTS, TOKEN_KEY } from "../constants";
import Profile from "../screens/app/Profile";
import AppDrawer from "../components/AppDrawer/AppDrawer";
import { useMeQuery } from "../graphql/generated/graphql";
import { View } from "react-native";
import { BoxIndicator } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setLocationAction, setUser } from "../actions";
import NewPet from "../screens/app/NewPet";
import { useLocationPermission, useMediaPermission } from "../hooks";
import * as Location from "expo-location";
import { StateType } from "../types";
import PreviewPet from "../screens/app/PreviewPet";
import { retrieve } from "../utils";
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const Routes = () => {
  const { user } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const [location, setLocation] = useState<Location.LocationObject>();

  const { granted } = useLocationPermission();

  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && granted && !!user) {
      setLoading(true);
      (async () => {
        const location = await Location.getCurrentPositionAsync();
        setLocation(location);
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

  React.useEffect(() => {
    let mounted: boolean = true;
    (async () => {
      setLoading(true);
      if (granted && mounted && location && !!user) {
        const [reversed, _] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        dispatch(setLocationAction(reversed));
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [location, granted, user, dispatch]);

  // if (fetching) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: COLORS.secondary,
  //       }}
  //     >
  //       <BoxIndicator color={COLORS.main} size={20} />
  //     </View>
  //   );
  // }
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
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="NewPet" component={NewPet} />
        <Drawer.Screen name="PreviewPet" component={PreviewPet} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
