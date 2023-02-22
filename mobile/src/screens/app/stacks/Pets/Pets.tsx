import { View, Text, Button } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";

const Pets: React.FunctionComponent<MarketNavProps<"Pets">> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>Pets</Text>

      <Button title="Nme" onPress={() => navigation.navigate("Pet")} />
    </View>
  );
};

export default Pets;
