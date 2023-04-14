import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNativeFile } from "apollo-upload-client";
import { Buffer } from "buffer";

export const encodeId = (data: string): string => {
  return Buffer.from(data, "utf-8").toString("base64");
};

export const decodeId = (data: string): string => {
  return Buffer.from(data, "base64").toString("utf-8");
};
export const generateRNFile = ({
  uri,
  name,
}: {
  uri: string;
  name: string;
}) => {
  return uri
    ? new ReactNativeFile({
        uri,
        type: "image/png",
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

export const del = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
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
