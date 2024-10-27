import { type StatusState } from "../../../utils";
import { type AccessRole } from "@/shared/config/access.config";

export interface ProfileState {
  id: string;
  role: AccessRole;
  email: string;
  username: string;
}

export interface AuthState {
  isAuth: boolean;
  profile: ProfileState;
  loginState: StatusState;
  registrationState: StatusState;
  sendHrSurveyState: StatusState;
  logoutState: StatusState;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SendHrSurveyPayload {
  fullName: string;
  company: string;
}

export interface UserData {
  token: string;
  user_id: string;
  role: number;
  email: string;
  username: string;
}
