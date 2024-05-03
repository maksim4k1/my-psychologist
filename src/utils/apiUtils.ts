import { ACCESS, AccessRole } from "../../config/access.config";

export function getRole(roleId: number = 0): AccessRole {
  if (roleId === 1) {
    return ACCESS.client;
  } else if (roleId === 2) {
    return ACCESS.psychologist;
  }

  return ACCESS.unauthorized;
}
