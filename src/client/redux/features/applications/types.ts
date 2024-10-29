import { type StatusState } from "@/client/utils";
import { GetApplicationsResponseData } from "@/shared/types";

export interface ApplicationProfileData {
  id: string;
  userId: string;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problem: string;
  age: number;
}

export interface ApplicationsState {
  applications: GetApplicationsResponseData;
  application: ApplicationProfileData | null;
  getApplicationsState: StatusState;
  getApplicationState: StatusState;
  confirmApplicationState: StatusState;
  sendApplicationState: StatusState;
}
