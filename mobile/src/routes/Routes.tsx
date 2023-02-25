import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppDrawerParamList } from "../params";
import { Login, Register } from "../screens/auth";
import Market from "../screens/app/Market";
import { COLORS, FONTS } from "../constants";
import Profile from "../screens/app/Profile";
import AppDrawer from "../components/AppDrawer/AppDrawer";
import { useMeQuery } from "../graphql/generated/graphql";
import { View } from "react-native";
import { BoxIndicator } from "../components";
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import NewPet from "../screens/app/NewPet";
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const Routes = () => {
  const [{ fetching, data }] = useMeQuery();
  const dispatch = useDispatch();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.me) {
      dispatch(setUser(data.me));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, data]);

  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="NewPet" component={NewPet} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
