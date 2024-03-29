import { ScrollView, View, TouchableOpacity } from "react-native";
import React from "react";
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
import { useKeyboardDimension } from "../../hooks";

const SellerProfile: React.FunctionComponent<
  AppDrawerNavProps<"SellerProfile">
> = ({ navigation, route: { params } }) => {
  const { user } = useSelector((state: StateType) => state);
  const userId: string = decodeId(params?.userId as string);
  const [category, setCategory] = React.useState<string>("ALL PETS");
  const { keyboardHeight } = useKeyboardDimension();

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
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.primary }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <ProfileCard
        editable={user?.id === userId}
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
          <ProfileChangePassword navigation={navigation as any} />
          <ProfileDeleteAccount navigation={navigation as any} />
          <ProfileLogoutButton navigation={navigation as any} />
        </>
      )}
      <View style={{ height: keyboardHeight, backgroundColor: COLORS.main }} />
      <Footer />
    </ScrollView>
  );
};

export default SellerProfile;
