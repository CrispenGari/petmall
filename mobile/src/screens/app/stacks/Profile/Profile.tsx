import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  ProfileCard,
  ProfilePetsFlatList,
  ProfileChangePassword,
  ProfileDeleteAccount,
  ProfileLogoutButton,
  Footer,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import { useKeyboardDimension } from "../../../../hooks";
import { MarketNavProps } from "../../../../params";
import { StateType } from "../../../../types";
import { decodeId } from "../../../../utils";
const Profile: React.FunctionComponent<MarketNavProps<"Profile">> = ({
  navigation,
  route: { params },
}) => {
  const { user } = useSelector((state: StateType) => state);
  const userId: string = decodeId(params.userId as string);
  const [category, setCategory] = React.useState<string>("ALL PETS");
  const { keyboardHeight } = useKeyboardDimension();

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

      <View style={{ height: 30 }} />
      <Footer />
    </ScrollView>
  );
};

export default Profile;
