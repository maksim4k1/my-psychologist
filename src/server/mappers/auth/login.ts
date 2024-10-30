import {
  type LoginApiRequestData,
  type LoginApiResponseData,
  type LoginRequestData,
  type LoginResponseData,
} from "@/shared/types";
import { getRole } from "@/shared/utils";

export const mapLoginRequest = (
  data: LoginRequestData,
): LoginApiRequestData => {
  const { email, password } = data;

  return {
    email,
    password,
  };
};

export const mapLoginResponse = (
  data: LoginApiResponseData,
): LoginResponseData => {
  const { user_id, role, email, username } = data;

  return {
    userId: user_id,
    role: getRole(role),
    email,
    username,
  };
};
