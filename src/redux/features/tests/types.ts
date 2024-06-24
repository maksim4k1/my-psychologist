import { StatusState } from "@/utils/stateCreators";

export interface TestShortData {
  id: string;
  title: string;
  description: string;
}

export interface TestsState {
  tests: TestShortData[];
  getTestsState: StatusState;
  testsByUserId: TestShortData[];
  getTestsByUserIdState: StatusState;
  giveTestState: StatusState;
}
