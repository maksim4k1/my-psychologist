import { StatusState } from "@/utils/stateCreators";

export interface TestData {
  id: string;
  title: string;
  description: string;
}

export interface TestsState {
  tests: TestData[];
  getTestsState: StatusState;
  testsByUserId: TestData[];
  getTestsByUserIdState: StatusState;
}
