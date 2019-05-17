import { EmoteCountDto } from "../models/emoteCount";

/*
 * Utility functions related to Emotes
 */

/**
 * Regex used for only a single emote occurence check
 */
export const EMOTE_REGEX = /<(?:[>]+|:[A-Za-z0-9]+:)\w+>/m;
/**
 * Regex used to find all occurences of emotes
 */
export const EMOTE_REGEX_GLOBAL = /<(?:[>]+|:[A-Za-z0-9]+:)\w+>/gm;

/**
 * Performs a simple regex check to determine whether a given string has an occurence of an emote
 *
 * @param message
 */
export const containsEmote = (message: string): boolean =>
  EMOTE_REGEX.test(message);

/**
 * Takes an emote in the discord raw text form and returns a tuple with the name and identifier
 *
 * <:gachiSLEEP:419599554078441482> => ["gachiSleep", "419599554078441482"]
 *
 * @param rawEmoji
 */
export const extractEmote = (rawEmoji: string): [string, string] =>
  rawEmoji
    .replace(/\<|\>/g, "")
    .substr(1, rawEmoji.length)
    .split(":") as [string, string];

/**
 * Accepts an array of emote regex matches and processes them, determining its
 * id, name and the amount of times it appeared in message it was extracted from
 *
 * @param matches
 */
export const processEmotes = (matches: RegExpMatchArray): EmoteCountDto[] => {
  let processed: string[] = [];
  let result: EmoteCountDto[] = [];

  matches.forEach(match => {
    if (processed.includes(match)) return;

    const [emoteName, emoteId] = extractEmote(match);

    result.push({ id: emoteId, count: countOccurence(match, matches) });
    processed.push(match);
  });

  return result;
};

/**
 * Counts the occurence of an emote
 *
 * @param needle
 * @param haystack
 */
const countOccurence = (needle: string, haystack: string[]): number => {
  let count = 0;
  for (let i = 0; i <= haystack.length; i++) {
    if (needle === haystack[i]) {
      count++;
    }
  }
  return count;
};
