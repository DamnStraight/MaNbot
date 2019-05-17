import User from "../models/user";
import { User as DiscordUser, Message } from "discord.js";
import axios from "axios";
import config from "../config/config";

export async function generateUserDatabase(message: Message) {
  const mutationAddUsers = (guildId: string, users: string[]) => {
    const data: string[] = users.map(user => `\"${user}\", `);

    return `
      mutation {
        addUsers(guildId: \"${guildId}\", users: [${data}]) {
          id
        }
      }
    `;
  };

  const guildId = message.guild.id;

  const users = message.guild.members.map(member => {
    return member.user.id;
  });

  try {
    const result = await axios.post(`${config.settings.app.url}/graphql`, {
      query: mutationAddUsers(guildId, users)
    });

    return result.data;
  } catch (err) {
    return undefined;
  }
}

export async function insertIfNotExist(
  user: DiscordUser
): Promise<User | null> {
  const mutationAddUser = (userId: string) => `
    mutation {
      addUser(userId: \"${userId}\") {
        id
        createdDate
        updatedDate
      }
    }
  `;

  axios
    .post(`${config.settings.app.url}/graphql`, {
      query: mutationAddUser(user.id)
    })
    .then(response => {
      return { ...response.data } as User;
    })
    .catch(err => {
      return null;
    });

  return null;
}
