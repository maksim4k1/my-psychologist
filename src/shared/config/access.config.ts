export type AccessRole =
  | "unauthorized"
  | "psychologist"
  | "client"
  | "hr"
  | "admin";

interface IAccess {
  unauthorized: "unauthorized";
  psychologist: "psychologist";
  client: "client";
  hr: "hr";
  admin: "admin";
}

export const ACCESS: IAccess = {
  unauthorized: "unauthorized",
  psychologist: "psychologist",
  client: "client",
  hr: "hr",
  admin: "admin",
};
