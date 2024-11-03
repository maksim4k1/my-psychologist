export type AccessRole = "unauthorized" | "psychologist" | "client" | "hr";

interface IAccess {
  unauthorized: "unauthorized";
  psychologist: "psychologist";
  client: "client";
  hr: "hr";
}

export const ACCESS: IAccess = {
  unauthorized: "unauthorized",
  psychologist: "psychologist",
  client: "client",
  hr: "hr",
};
