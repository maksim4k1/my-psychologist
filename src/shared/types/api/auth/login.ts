import { type AccessRole } from "@/shared/config/access.config";

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginApiRequestData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  userId: string;
  role: AccessRole;
  email: string;
  username: string;
}

export interface LoginApiResponseData {
  token: string;
  user_id: string;
  role: number;
  email: string;
  username: string;
}
