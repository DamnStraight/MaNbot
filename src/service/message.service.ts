import axios from "axios";
import { Message } from "discord.js";
import config from "../config/config";

interface AddMessageInput {
  userId: string;
  channelId: string;
  userName: string;
  dateSent: string;
  profileImage: string;
  content: string;
}

export async function addMessage(message: Message) {
  const mutationAddMessage = ({
    userId,
    channelId,
    userName,
    dateSent,
    profileImage,
    content
  }: AddMessageInput) => {
    return `
      mutation {
        addMessage(data: { userId: \"${userId}\", channelId: \"${channelId}\", userName: \"${userName}\", dateSent: \"${dateSent}\", profileImage: \"${profileImage}\", content: \"${content}\"}) {
          id
        }
      }
    `;
  };

  const payload = {
    userId: message.author.id,
    userName: message.author.tag,
    channelId: message.channel.id,
    dateSent: message.createdAt.toISOString(),
    profileImage: message.author.avatarURL,
    content: message.content
  } as AddMessageInput;

  const result = await axios.post(`${config.settings.app.url}/graphql`, {
    query: mutationAddMessage(payload)
  });

  return result;
}
