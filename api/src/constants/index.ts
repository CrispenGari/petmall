export const __cookieName__: string = "jwt";
export const __storageBaseURL__: string =
  "http://127.0.0.1:3001/petmall/api/storage";

export enum Events {
  NEW_REACTION_TO_COMMENT = "NEW_REACTION_TO_COMMENT",
  NEW_PET = "NEW_PET",
  NEW_COMMENT = "NEW_COMMENT",
  NEW_COMMENT_REPLY = "NEW_COMMENT_REPLY",
  NEW_REACTION_TO_PET = "NEW_REACTION_TO_PET",
  ON_USER_STATE_CHANGED = "ON_USER_STATE_CHANGED",
  ON_USER_AUTH_STATE_CHANGED = "ON_USER_AUTH_STATE_CHANGED",
}
