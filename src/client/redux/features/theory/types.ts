import { type StatusState } from "@/client/utils/stateCreators";

export interface Theme {
  id: string;
  title: string;
  progress: number;
  fullProgress: number;
}

export interface ThemeContentItem {
  id: string;
  text: string;
}

export interface TheoryState {
  themes: Theme[];
  themeContent: ThemeContentItem[];
  getThemesState: StatusState;
  getThemeContentState: StatusState;
}
