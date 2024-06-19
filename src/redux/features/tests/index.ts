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
  testsByUserId: [],
  getTestsByUserIdState: createDefaultState(),
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
  },
});

export const testsActions: Actions = testsSlice.actions;

export default testsSlice.reducer;
