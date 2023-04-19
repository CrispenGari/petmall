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
import { useLocationPermission, useMediaQuery } from "../hooks";
import * as Location from "expo-location";
import { StateType } from "../types";
import PreviewPet from "../screens/app/PreviewPet";
import { retrieve, sendPushNotification } from "../utils";
import SellerProfile from "../screens/app/SellerProfile";
import { View } from "react-native";
import { BoxIndicator } from "../components";
import { setChats, setLocation, setNotifications, setUser } from "../actions";
import {
  useMeQuery,
  useMyChatsQuery,
  useNewChatMessageSubscription,
  useNewMessageSubscription,
  useNewNotificationSubscription,
  useNotificationsQuery,
  useOnUserStateChangeSubscription,
} from "../graphql/generated/graphql";
import useNotificationsToken from "../hooks/useNotificationsToken";
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const Routes = () => {
  const { dimension } = useMediaQuery();
  const { user } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const { granted } = useLocationPermission();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { token } = useNotificationsToken();
  const [noti, setNoti] = React.useState<{
    message: string;
    title: string;
    data: {
      type: "pet-interaction" | "new-message";
      id: string;
    };
  }>({
    message: "",
    title: "",
    data: { id: "", type: "pet-interaction" },
  });

  const [{ data: notification }] = useNewNotificationSubscription({
    variables: {
      input: {
        userId: user?.id || "",
      },
    },
  });

  const [{ data: chatMessage }] = useNewChatMessageSubscription({
    variables: {
      input: {
        userId: user?.id || "",
      },
    },
  });

  const [{ data: newMessage }] = useNewMessageSubscription({
    variables: {
      input: {
        userId: user?.id || "",
      },
    },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && newMessage?.newMessage.chatId) {
      setNoti({
        title: `New Market Message - PetMall`,
        message: `${newMessage.newMessage.message?.message}`,
        data: {
          id: newMessage.newMessage.chatId,
          type: "new-message",
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [newMessage]);

  const [{ data: chats }, refetchChats] = useMyChatsQuery({});
  const [{ data: notifications }, refetchNotifications] =
    useNotificationsQuery();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!noti.title && !!token) {
      (async () => {
        await sendPushNotification(token, noti.title, noti.message, noti.data);
        setNoti({
          message: "",
          title: "",
          data: { id: "", type: "pet-interaction" },
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [token, noti]);
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
    if (mounted && !!notification?.newNotification) {
      (async () => {
        if (!!notification.newNotification.notification) {
          if (!!notification.newNotification.petId) {
            setNoti({
              title: `New Notification - PetMall`,
              message: notification.newNotification.notification.notification,
              data: {
                id: notification.newNotification.petId,
                type: "pet-interaction",
              },
            });
          }
        }
        await refetchNotifications();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchNotifications, notification]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!notifications?.notifications) {
      dispatch(setNotifications(notifications.notifications));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, notifications]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chats?.chats) {
      dispatch(setChats(chats.chats as any));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, chats]);
  const [{ data: newUser }, refetchUser] = useMeQuery({
    requestPolicy: "network-only",
  });
  const [{ data }] = useOnUserStateChangeSubscription({
    variables: { userId: user?.id || "" },
  });
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.onUserStateChange) {
      (async () => {
        await refetchUser();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchUser, data]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatMessage?.newChatMessage?.chatId) {
      (async () => {
        await refetchChats();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [chatMessage, refetchChats]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const jwt = await retrieve(TOKEN_KEY);
        const me = newUser?.me || null;
        const isLoggedIn = !!!me ? false : me.isLoggedIn ? true : false;

        if (!!!jwt || !!!me || !isLoggedIn) {
          dispatch(setUser(null));
        } else {
          dispatch(setUser(me));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [newUser, dispatch]);
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
            fontSize: dimension.width >= 600 ? 30 : 20,
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
