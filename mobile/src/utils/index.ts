import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNativeFile } from "apollo-upload-client";

export const generateRNFile = ({
  uri,
  name,
}: {
  uri: string;
  name: string;
}) => {
  const type: string = "image/png";
  return uri
    ? new ReactNativeFile({
        uri,
        type,
        name,
      })
    : null;
};
export const store = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const retrieve = async (key: string): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error: any) {
    return null;
  }
};
