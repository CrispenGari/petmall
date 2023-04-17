import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import DrawerProfile from "../DrawerProfile/DrawerProfile";
import DrawerItem from "../DrawerItem/DrawerItem";
import {
  Foundation,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { styles } from "../../styles";
import { encodeId } from "../../utils";
interface Props {
  props: DrawerContentComponentProps;
}
const AppDrawer: React.FunctionComponent<Props> = ({
  props: { navigation },
}) => {
  const { user, chats, notifications } = useSelector(
    (state: StateType) => state
  );
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
        paddingHorizontal: 10,
      }}
    >
      {user ? (
        <DrawerProfile
          onPress={() => {
            navigation.navigate("SellerProfile", {
              userId: encodeId(user.id),
            });
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "white",
            borderBottomWidth: 0.5,
            paddingBottom: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={[
              styles.h1,
              { fontSize: 20, letterSpacing: 1, color: "white" },
            ]}
          >
            PETMALL
          </Text>
          <Image
            source={{
              uri: Image.resolveAssetSource(require("../../../assets/icon.png"))
                .uri,
            }}
            style={{
              width: 100,
              height: 100,
              marginVertical: 10,
              resizeMode: "contain",
            }}
          />
        </View>
      )}

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
      ) : (
        <>
          <DrawerItem
            title="Market Pet"
            onPress={() =>
              navigation.navigate("NewPet", {
                editPet: "",
              })
            }
            icon={<MaterialIcons name="pets" size={24} color="white" />}
          />
          <DrawerItem
            title="Notifications"
            onPress={() =>
              navigation.navigate("Notifications", {
                userId: encodeId(user.id),
              })
            }
            notification={!!notifications.unread}
            icon={
              <Ionicons name="notifications-sharp" size={24} color="white" />
            }
          />
          <DrawerItem
            title="Chats"
            notification={!!chats.unopened}
            onPress={() =>
              navigation.navigate("Chats", {
                userId: encodeId(user.id),
              })
            }
            icon={<FontAwesome name="comments-o" size={24} color="white" />}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
};

export default AppDrawer;
