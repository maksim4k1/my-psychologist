import { ACCESS, AccessRole } from "../config/access.config";
import { HttpError } from "../config/api.config";

export const instanceofHttpError = (object: any): object is HttpError => {
  return "status" in object && "message" in object;
};

export function getRole(roleId: number = 0): AccessRole {
  if (roleId === 1) {
    return ACCESS.client;
  } else if (roleId === 2) {
    return ACCESS.psychologist;
  } else if (roleId === 3) {
    return ACCESS.hr;
  }

  return ACCESS.unauthorized;
}
