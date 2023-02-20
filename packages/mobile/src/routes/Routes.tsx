import { View, Text } from "react-native";
import React from "react";
import { useHelloQuery } from "@petmall/shared";

const Routes = () => {
  const [{ data, fetching, error }, _] = useHelloQuery({
    variables: {
      name: "There",
    },
  });

  console.log(JSON.stringify({ data, error }, null, 2));
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify({ data: data?.hello, fetching }, null, 2)}</Text>
    </View>
  );
};

export default Routes;
