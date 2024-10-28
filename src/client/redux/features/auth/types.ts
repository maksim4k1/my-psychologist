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
