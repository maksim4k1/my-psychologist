import {
  type UpdateUserApiRequestData,
  type UpdateUserRequestData,
} from "@/shared/types";
import { getRoleId } from "@/shared/utils";

export const mapUpdateUserRequest = (
  data: UpdateUserRequestData,
): UpdateUserApiRequestData => {
  const { username, role } = data;

  return {
    birth_date: "2000-01-01",
    gender: "1",
    username,
    request: [1],
    city: "",
    description: "",
    type: getRoleId(role),
  };
};
