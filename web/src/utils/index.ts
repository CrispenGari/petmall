import { Buffer } from "buffer";
import { NavigateFunction } from "react-router-dom";

export const encodeId = (data: string): string => {
  return Buffer.from(data, "utf-8").toString("base64");
};

export const decodeId = (data: string): string => {
  return Buffer.from(data, "base64").toString("utf-8");
};

export const sendNotification = (
  title: string,
  message: string,
  data: {
    type: "pet-interaction" | "new-message";
    id: string;
  },
  navigator: NavigateFunction
) => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    const notification = new Notification(title);

    notification.addEventListener("click", () => {
      switch (data.type) {
        case "new-message":
          navigator(`/app/chat/${encodeId(data.id)}`);
          break;
        case "pet-interaction":
          navigator(`/app/pet/${encodeId(data.id)}`);
          break;
        default:
          break;
      }
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(title, {
          body: message,
          data,
        });
        notification.addEventListener("click", () => {
          switch (data.type) {
            case "new-message":
              navigator(`/app/chat/${encodeId(data.id)}`);
              break;
            case "pet-interaction":
              navigator(`/app/pet/${encodeId(data.id)}`);
              break;
            default:
              break;
          }
        });
      }
    });
  }
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
