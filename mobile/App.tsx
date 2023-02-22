import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { LogBox, StatusBar, View, Text } from "react-native";
import { useFonts } from "expo-font";
import { Fonts } from "./src/constants";
import UrqlProvider from "./src/providers/UrqlProvider";
import Routes from "./src/routes/Routes";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

const PetMall = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar barStyle={"light-content"} />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <UrqlProvider>
      <StatusBar barStyle={"light-content"} />
      <Routes />
    </UrqlProvider>
  );
};

registerRootComponent(PetMall);
