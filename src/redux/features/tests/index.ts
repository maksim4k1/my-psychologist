import { Actions } from "@/redux/store";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { TestData, TestsState } from "./types";

const initialState: TestsState = {
  tests: [],
  getTestsState: createDefaultState(),
  testsByUserId: [],
  getTestsByUserIdState: createDefaultState(),
  giveTestState: createDefaultState(),
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
      { payload }: PayloadAction<TestData[]>,
    ) => {
      state.getTestsByUserIdState = createSuccessState();
      state.testsByUserId = payload;
    },
    getTestsByUserIdFailure: (state, { payload }: PayloadAction<string>) => {
      state.getTestsByUserIdState = createFailureState(payload);
    },

    getTestsLoading: (state) => {
      state.getTestsState = createLoadingState();
    },
    getTestsSuccess: (state, { payload }: PayloadAction<TestData[]>) => {
      state.getTestsState = createSuccessState();
      state.tests = payload;
    },
    getTestsFailure: (state, { payload }: PayloadAction<string>) => {
      state.getTestsState = createFailureState(payload);
    },

    giveTestLoading: (state) => {
      state.giveTestState = createLoadingState();
    },
    giveTestSuccess: (state) => {
      state.giveTestState = createSuccessState();
    },
    giveTestFailure: (state, { payload }: PayloadAction<string>) => {
      state.giveTestState = createFailureState(payload);
    },
    giveTestStateDefault: (state) => {
      state.giveTestState = createDefaultState();
    },
  },
});

export const testsActions: Actions = testsSlice.actions;

export default testsSlice.reducer;
