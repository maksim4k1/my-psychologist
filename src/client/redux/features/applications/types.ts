import { type StatusState } from "@/client/utils/stateCreators";

export interface ApplicationData {
  id: string;
  userId: string;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problem: string;
}

export interface ApplicationProfileData extends ApplicationData {
  age: number;
  problems?: never;
}

export interface ApplicationsState {
  applications: ApplicationData[];
  application: ApplicationProfileData | null;
  getApplicationsState: StatusState;
  getApplicationState: StatusState;
  confirmApplicationState: StatusState;
  sendApplicationState: StatusState;
}
