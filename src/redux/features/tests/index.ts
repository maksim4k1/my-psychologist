import { Actions } from "@/redux/store";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { TestData, TestShortData, TestsState } from "./types";
import { HttpError } from "../../../../config/api.config";

const initialState: TestsState = {
  tests: [],
  getTestsState: createDefaultState(),
  testsByUserId: [],
  getTestsByUserIdState: createDefaultState(),
  giveTestState: createDefaultState(),
  getTestInfoState: createDefaultState(),
  testInfo: null,
};

const testsSlice: Slice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    getTestsByUserIdLoading: (state) => {
      state.getTestsByUserIdState = createLoadingState();
    },
    getTestsByUserIdSuccess: (
      state,
      { payload }: PayloadAction<TestShortData[]>,
    ) => {
      state.getTestsByUserIdState = createSuccessState();
      state.testsByUserId = payload;
    },
    getTestsByUserIdFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestsByUserIdState = createFailureState(payload);
    },

    getTestsLoading: (state) => {
      state.getTestsState = createLoadingState();
    },
    getTestsSuccess: (state, { payload }: PayloadAction<TestShortData[]>) => {
      state.getTestsState = createSuccessState();
      state.tests = payload;
    },
    getTestsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestsState = createFailureState(payload);
    },

    giveTestLoading: (state) => {
      state.giveTestState = createLoadingState();
    },
    giveTestSuccess: (state) => {
      state.giveTestState = createSuccessState();
    },
    giveTestFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.giveTestState = createFailureState(payload);
    },
    giveTestStateDefault: (state) => {
      state.giveTestState = createDefaultState();
    },

    getTestInfoLoading: (state) => {
      state.getTestInfoState = createLoadingState();
    },
    getTestInfoSuccess: (state, { payload }: PayloadAction<TestData>) => {
      state.getTestInfoState = createSuccessState();
      state.testInfo = payload;
    },
    getTestInfoFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestInfoState = createFailureState(payload);
    },
  },
});

export const testsActions: Actions = testsSlice.actions;

export default testsSlice.reducer;
