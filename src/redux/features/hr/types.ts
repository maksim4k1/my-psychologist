import { StatusState } from "@/utils/stateCreators";

export interface SendHrSurveyPayload {
  fullName: string;
  company: string;
}

export interface HrState {
  sendHrSurveyState: StatusState;
}
