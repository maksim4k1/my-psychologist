import { StatusState } from "@/utils/stateCreators";

export interface ApplicationData {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problem: string;
}

export interface ApplicationsState {
  applications: ApplicationData[];
  getApplicationsState: StatusState;
}
