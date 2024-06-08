import { StatusState } from "@/utils/stateCreators";

export interface ApplicationData {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problem: string;
}

export interface PsychologistState {
  applications: ApplicationData[];
  getApplicationsState: StatusState;
}
