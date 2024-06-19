export type AccessRole =
  | "public"
  | "unauthorized"
  | "authorized"
  | "psychologist"
  | "client"
  | "hr";

interface IAccess {
  [key: string]: AccessRole;
}

export const ACCESS: IAccess = {
  public: "public",
  unauthorized: "unauthorized",
  authorized: "authorized",
  psychologist: "psychologist",
  client: "client",
  hr: "hr",
};
