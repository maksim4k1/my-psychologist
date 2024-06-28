import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HrState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { HttpError } from "../../../../config/api.config";

const initialState: HrState = {
  sendHrSurveyState: createDefaultState(),
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    // send hr survey actions
    sendHrSurveyLoading: (state) => {
      state.sendHrSurveyState = createLoadingState();
    },
    sendHrSurveySuccess: (state) => {
      state.sendHrSurveyState = createSuccessState();
    },
    sendHrSurveyFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.sendHrSurveyState = createFailureState(payload);
    },
    sendHrSurveySetDefaultState: (state) => {
      state.sendHrSurveyState = createDefaultState();
    },
  },
});

export const hrActions = hrSlice.actions;

export default hrSlice.reducer;
