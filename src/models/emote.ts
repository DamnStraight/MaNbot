import EmoteCount from "./emoteCount";

export default interface Emote {
  id: string;
  name: string;
  deleted: boolean;
  createdDate: Date;
  updatedDate: Date;
  emoteCounts: EmoteCount[];
}