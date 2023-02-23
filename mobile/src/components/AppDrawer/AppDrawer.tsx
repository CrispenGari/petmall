import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import DrawerProfile from "../DrawerProfile/DrawerProfile";
import DrawerItem from "../DrawerItem/DrawerItem";
import { Foundation, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
interface Props {
  props: DrawerContentComponentProps;
}

const AppDrawer: React.FunctionComponent<Props> = ({
  props: { navigation },
}) => {
  const { user } = useSelector((state: StateType) => state);
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
        paddingHorizontal: 10,
      }}
    >
      {user ? <DrawerProfile /> : null}

      <DrawerItem
        title="Market"
        onPress={() => navigation.navigate("Market")}
        icon={<Foundation name="guide-dog" size={24} color="white" />}
      />
      {!!!user ? (
        <>
          <DrawerItem
            title="Login"
            onPress={() => navigation.navigate("Login")}
            icon={
              <AntDesign
                name="login"
                size={24}
                color={false ? COLORS.main : "white"}
              />
            }
          />
          <DrawerItem
            title="Register"
            onPress={() => navigation.navigate("Register")}
            icon={
              <AntDesign
                name="adduser"
                size={24}
                color={false ? COLORS.main : "white"}
              />
            }
          />
        </>
      ) : null}
    </DrawerContentScrollView>
  );
};

export default AppDrawer;
