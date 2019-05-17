import Emote from "./Emote";
import User from "./user";

export default interface EmoteCount {
  id: number;
  emote: Emote;
  user: User;
  createdDate: Date;
  updatedDate: Date;
  count: number;
}

export interface EmoteCountDto {
  id: string;
  count: number;
}