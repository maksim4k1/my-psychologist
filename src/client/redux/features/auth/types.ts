import { type StatusState } from "@/client/utils";
import { type AccessRole } from "@/shared/config/access.config";

interface ProfileState {
  id: string;
  role: AccessRole;
  email: string;
  username: string;
}

export interface AuthState {
  isAuth: boolean;
  profile: ProfileState;
  registrationState: StatusState;
  sendHrSurveyState: StatusState;
  logoutState: StatusState;
}
