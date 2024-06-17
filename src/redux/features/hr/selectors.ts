import { RootState } from "@/redux/store";
import { HrState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectHrModule = (state: RootState): HrState => {
  return state.hrReducer;
};

export const selectSendHrSurveyState = (state: RootState): StatusState => {
  return selectHrModule(state).sendHrSurveyState;
};
