import { View, Text } from "react-native";
import React from "react";
interface Props {
  category: string;
  subtitle: string;
  userId: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const ProfilePetsFlatList: React.FC<Props> = ({
  category,
  subtitle,
  userId: id,
  setCategory,
}) => {
  return (
    <View>
      <Text>ProfilePetsFlatList</Text>
    </View>
  );
};

export default ProfilePetsFlatList;
