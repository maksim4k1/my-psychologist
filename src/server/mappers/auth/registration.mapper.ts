import {
  type RegistrationApiRequestData,
  type RegistrationApiResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
} from "@/shared/types";
import { getRole } from "@/shared/utils/api";

export const mapRegistrationRequest = (
  data: RegistrationRequestData,
): RegistrationApiRequestData => {
  const { username, email, password, confirmPassword } = data;

  return {
    username,
    email,
    password,
    confirm_password: confirmPassword,
  };
};

export const mapRegistrationResponse = (
  data: RegistrationApiResponseData,
): RegistrationResponseData => {
  const { user_id, role, email, username } = data;

  return {
    userId: user_id,
    role: getRole(role),
    email,
    username,
  };
};
