import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//  Market Stack Param Lists
export type MarketParamList = {
  Pets: undefined;
  Pet: undefined;
  NewPet: undefined;
};

export type MarketNavProps<T extends keyof MarketParamList> = {
  navigation: StackNavigationProp<MarketParamList, T>;
  route: RouteProp<MarketParamList, T>;
};

export type AppDrawerParamList = {
  Market: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppDrawerNavProps<T extends keyof AppDrawerParamList> = {
  navigation: DrawerNavigationProp<AppDrawerParamList, T>;
  route: RouteProp<AppDrawerParamList, T>;
};
