import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { COLORS } from "../../constants";

interface Props {
  onPress?: () => void;
  title?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

const DrawerItem: React.FunctionComponent<Props> = ({
  title,
  active,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        marginBottom: 1,
      }}
    >
      <Text style={[styles.h2, { color: "white", letterSpacing: 1 }]}>
        {title}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

export default DrawerItem;
