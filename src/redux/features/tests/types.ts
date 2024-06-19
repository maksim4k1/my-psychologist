import { StatusState } from "@/utils/stateCreators";

export interface TestData {
  id: string;
  title: string;
  description: string;
}

export interface TestsState {
  testsByUserId: TestData[];
  getTestsByUserIdState: StatusState;
}
