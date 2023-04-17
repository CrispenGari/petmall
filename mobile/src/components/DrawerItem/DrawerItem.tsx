import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { COLORS } from "../../constants";

interface Props {
  onPress?: () => void;
  title?: string;
  active?: boolean;
  icon?: React.ReactNode;
  notification?: Boolean;
}

const DrawerItem: React.FunctionComponent<Props> = ({
  title,
  active,
  onPress,
  icon,
  notification,
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
        position: "relative",
      }}
    >
      {notification && (
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: COLORS.tertiary,
            borderRadius: 10,
            position: "absolute",
            right: 10,
            top: 5,
          }}
        />
      )}
      <Text style={[styles.h2, { color: "white", letterSpacing: 1 }]}>
        {title}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

export default DrawerItem;
