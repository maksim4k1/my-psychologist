export type AccessRole =
  | "public"
  | "unauthorized"
  | "authorized"
  | "psychologist"
  | "client"
  | "hr";

interface IAccess {
  public: "public";
  unauthorized: "unauthorized";
  authorized: "authorized";
  psychologist: "psychologist";
  client: "client";
  hr: "hr";
}

export const ACCESS: IAccess = {
  public: "public",
  unauthorized: "unauthorized",
  authorized: "authorized",
  psychologist: "psychologist",
  client: "client",
  hr: "hr",
};
