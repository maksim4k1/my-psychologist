import {
  type GetDailyTasksApiResponse,
  type GetDailyTasksResponse,
} from "@/shared/types";

export const mapGetDailyTasksResponse = (
  data: GetDailyTasksApiResponse,
): GetDailyTasksResponse => {
  return data.map(
    ({ id, destination_id, title, is_complete, short_description, type }) => ({
      id,
      title,
      description: short_description,
      taskType: type,
      taskId: destination_id,
      completed: is_complete,
    }),
  );
};
