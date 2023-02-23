import { TouchableOpacity, Text, Image, View } from "react-native";
import React from "react";
import { styles } from "../../styles";

const DrawerProfile = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "white",
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        marginBottom: 10,
      }}
    >
      <Text style={[styles.h1, { color: "white" }]}>Authenticated</Text>
      <Image
        source={{
          uri: Image.resolveAssetSource(require("../../../assets/profile.png"))
            .uri,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          marginVertical: 10,
        }}
      />
      <Text style={[styles.h1, { color: "white" }]}>username@gmail.com</Text>

      <TouchableOpacity style={[styles.button, { marginVertical: 10 }]}>
        <Text style={[styles.h1, { color: "white" }]}>logout</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DrawerProfile;
