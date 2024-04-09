import { AccessRole } from "./../../../../config/access.config";

export interface AuthState {
  isAuth: boolean;
  role: AccessRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
