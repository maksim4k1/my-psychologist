import { type AccessRole } from "@/shared/config/access.config";

export interface UpdateUserRequestData {
  username: string;
  role: AccessRole;
}

export interface UpdateUserApiRequestData {
  birth_date: string;
  gender: string;
  username: string;
  request: number[];
  city: string;
  description: string;
  department: string;
  type: number;
}
