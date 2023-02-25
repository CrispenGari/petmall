import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//  Market Stack Param Lists
export type MarketParamList = {
  Pets: undefined;
  Pet: undefined;
};

export type MarketNavProps<T extends keyof MarketParamList> = {
  navigation: StackNavigationProp<MarketParamList, T>;
  route: RouteProp<MarketParamList, T>;
};

export type AppDrawerParamList = {
  Market: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  NewPet: undefined;
  PreviewPet: {
    image: {
      uri: string;
      name: string;
      mimeType: string;
    };
    location: string;
    description: string;
    category: string;
    gender: string;
    price: number;
    age: number;
    name: string;
  };
};

export type AppDrawerNavProps<T extends keyof AppDrawerParamList> = {
  navigation: DrawerNavigationProp<AppDrawerParamList, T>;
  route: RouteProp<AppDrawerParamList, T>;
};