import EmoteCount from "./emoteCount";

export default interface User {
  id: string;
  guildId: string;
  createdDate: Date;
  updatedDate: Date;
  emoteCount: EmoteCount[];
}

export interface AddUserPayload {
  userId: string;
  guildId: string;
}