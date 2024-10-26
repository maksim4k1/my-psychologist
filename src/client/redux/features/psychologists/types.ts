import { type StatusState } from "@/client/utils/stateCreators";

export interface PsychologistData {
  userId: string;
  profileImage: string;
  username: string;
  isOnline: boolean;
}

export interface PsychologistsState {
  psychologists: PsychologistData[];
  myPsychologists: PsychologistData[];
  getPsychologistsState: StatusState;
  getPsychologistState: StatusState;
}
