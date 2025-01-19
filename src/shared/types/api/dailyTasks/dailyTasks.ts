export type GetDailyTasksApiResponse = {
  id: string;
  type: number;
  title: string;
  short_description: string;
  destination_id: string;
  is_complete: boolean;
}[];

export type GetDailyTasksResponse = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  taskType: DailyTaskType;
  taskId: string;
}[];

export type DailyTaskType =
  | "theory"
  | "moodTracker"
  | "test"
  | "kptDiary"
  | "exercise";

export interface IDailyTaskTypes {
  theory: "theory";
  moodTracker: "moodTracker";
  test: "test";
  kptDiary: "kptDiary";
  exercise: "exercise";
}
