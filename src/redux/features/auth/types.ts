import { StatusState } from "../../../utils/stateCreators";
import { AccessRole } from "./../../../../config/access.config";

export interface AuthState {
  isAuth: boolean;
  role: AccessRole;
  loginState: StatusState;
  registerState: StatusState;
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

export interface UserData {
  token: string;
  user_id: string;
  role: number;
  email: string;
  username: string;
}
