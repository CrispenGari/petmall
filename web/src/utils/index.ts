export const store = async (key: string, value: string): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  try {
    await localStorage.setItem(key, value);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const retrieve = async (key: string): Promise<string | null> => {
  if (typeof window === "undefined") return null;
  try {
    const data = await localStorage.getItem(key);
    return data;
  } catch (error: any) {
    return null;
  }
};
