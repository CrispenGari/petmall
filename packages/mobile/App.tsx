import Routes from "./src/routes/Routes";
import { registerRootComponent } from "expo";
import { StatusBar } from "react-native";
import { UrqlProvider } from "@petmall/providers";

const PetMall = () => {
  return (
    <UrqlProvider>
      <StatusBar barStyle={"light-content"} />
      <Routes />
    </UrqlProvider>
  );
};

registerRootComponent(PetMall);
