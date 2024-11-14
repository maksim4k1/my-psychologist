import { type AccessRole } from "@/shared/config/access";

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

export interface GetUserApiResponseData {
  birth_date: string;
  gender: string;
  username: string;
  request: {
    text: string;
    id: number;
  }[];
  city: string;
  description: string;
  department: string;
  type: number;
}

export interface GetUserResponseData {
  username: string;
  role: AccessRole;
}
