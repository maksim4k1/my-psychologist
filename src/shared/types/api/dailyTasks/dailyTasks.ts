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
  taskType: number;
  taskId: string;
}[];
