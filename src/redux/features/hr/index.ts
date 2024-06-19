import { Actions } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HrState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";

const initialState: HrState = {
  sendHrSurveyState: createDefaultState(),
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    sendHrSurveyLoading: (state) => {
      state.sendHrSurveyState = createLoadingState();
    },
    sendHrSurveySuccess: (state) => {
      state.sendHrSurveyState = createSuccessState();
    },
    sendHrSurveyFailure: (state, { payload }: PayloadAction<string>) => {
      state.sendHrSurveyState = createFailureState(payload);
    },
  },
});

export const hrActions: Actions = hrSlice.actions;

export default hrSlice.reducer;
