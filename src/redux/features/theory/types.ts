import { StatusState } from "@/utils/stateCreators";

export interface Theme {
  id: string;
  title: string;
  progress: number;
  fullProgress: number;
}

export interface TheoryState {
  themes: Theme[];
  getThemesState: StatusState;
}
