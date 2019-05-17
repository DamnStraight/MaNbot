import { generateEmoteDatabase, showEmoteCount } from './service/emote.service';
import config from './config/config';
import { Message } from 'discord.js';
import { registerServer } from './service/bot.service';

const { prefix } = config.settings.bot;

let commandMap: Map<string, (message: Message, args?: string[]) => Promise<any>> = new Map();

commandMap.set(`${prefix}register`, registerServer);
commandMap.set(`${prefix}count`, showEmoteCount);

export default commandMap;
