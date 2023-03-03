export const ID_WHITELIST = process.env.WHITELIST_ID?.split(",") ?? [];

export const isAuthorized = (id: string = "") => ID_WHITELIST.includes(id);
