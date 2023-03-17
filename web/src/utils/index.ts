import { Buffer } from "buffer";

export const encodeId = (data: string): string => {
  return Buffer.from(data, "utf-8").toString("base64");
};

export const decodeId = (data: string): string => {
  return Buffer.from(data, "base64").toString("utf-8");
};

export const store = async (key: string, value: string): Promise<boolean> => {
  try {
    await localStorage.setItem(key, value);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const del = async (key: string): Promise<boolean> => {
  try {
    await localStorage.removeItem(key);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const retrieve = async (key: string): Promise<string> => {
  try {
    const data = await localStorage.getItem(key);
    return data ?? "";
  } catch (error: any) {
    return "";
  }
};
