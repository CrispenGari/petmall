import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import { AntDesign } from "@expo/vector-icons";

const Profile: React.FunctionComponent<AppDrawerNavProps<"Profile">> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
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
  }, []);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
