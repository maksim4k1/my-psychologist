import { type AccessRole } from "@/shared/config/access.config";

export interface RegistrationRequestData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationApiRequestData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegistrationResponseData {
  userId: string;
  role: AccessRole;
  email: string;
  username: string;
}

export interface RegistrationApiResponseData {
  token: string;
  user_id: string;
  role: number;
  email: string;
  username: string;
}
