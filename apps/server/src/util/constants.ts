export const ID_WHITELIST = [
  "122512846041907203", // Me
];

export const isAuthorized = (id: string = "") => ID_WHITELIST.includes(id);
