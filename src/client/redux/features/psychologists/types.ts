import { type StatusState } from "@/client/utils";
import { type GetPsychologistsResponseData } from "@/shared/types";

export interface PsychologistsState {
  psychologists: GetPsychologistsResponseData;
  myPsychologists: GetPsychologistsResponseData;
  getPsychologistsState: StatusState;
  getPsychologistState: StatusState;
}
