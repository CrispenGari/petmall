import { ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { COLORS } from "../../constants";
import {
  Footer,
  ProfileCard,
  ProfileChangePassword,
  ProfileDeleteAccount,
  ProfileLogoutButton,
  ProfilePetsFlatList,
} from "../../components";
import { decodeId } from "../../utils";

const SellerProfile: React.FunctionComponent<
  AppDrawerNavProps<"SellerProfile">
> = ({ navigation, route: { params } }) => {
  const { user } = useSelector((state: StateType) => state);
  const userId: string = decodeId(params?.userId as string);
  const [category, setCategory] = React.useState<string>("ALL PETS");

  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: !!user ? `${user.firstName}` : "Profile",
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
  }, [user]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <ProfileCard
        userId={userId}
        setCategory={setCategory}
        category={category}
      />
      <ProfilePetsFlatList
        navigation={navigation as any}
        userId={userId}
        category={category}
        subtitle={`Pet in the market.`}
        setCategory={setCategory}
      />
      {user?.id === userId && (
        <>
          <ProfileChangePassword />
          <ProfileDeleteAccount />
          <ProfileLogoutButton />
        </>
      )}

      <Footer />
    </ScrollView>
  );
};

export default SellerProfile;
