export const __cookieName__: string = "jwt";
export const __storageBaseURL__: string =
  "http://127.0.0.1:3001/petmall/api/storage";
export const __codePrefix__: string = "code:";
export const __tokePrefix__: string = "token:";
export const __codeExp__: number = 60 * 10; // 10m
export const __tokenExp__: number = 60 * 30; // 30m

export const __clientBaseURL__: string = "http://localhost:3000";

export enum Events {
  NEW_REACTION_TO_COMMENT = "NEW_REACTION_TO_COMMENT",
  NEW_REACTION_TO_COMMENT_NOTIFICATION = "NEW_REACTION_TO_COMMENT_NOTIFICATION",
  REFETCH_NOTIFICATIONS = "REFETCH_NOTIFICATIONS",
  NEW_PET = "NEW_PET",
  DELETE_PET = "DELETE_PET",
  NEW_PET_UPDATE = "NEW_PET_UPDATE",
  NEW_COMMENT = "NEW_COMMENT",
  NEW_COMMENT_NOTIFICATION = "NEW_COMMENT_NOTIFICATION",
  NEW_REACTION_TO_PET = "NEW_REACTION_TO_PET",
  NEW_REACTION_TO_PET_NOTIFICATION = "NEW_REACTION_TO_PET_NOTIFICATION",
  NEW_COMMENT_REPLY = "NEW_COMMENT_REPLY",
  NEW_COMMENT_REPLY_NOTIFICATION = "NEW_COMMENT_REPLY_NOTIFICATION",
  ON_USER_STATE_CHANGED = "ON_USER_STATE_CHANGED",
  ON_USER_AUTH_STATE_CHANGED = "ON_USER_AUTH_STATE_CHANGED",
}
