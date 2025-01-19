import {
  type GetDailyTasksApiResponse,
  type GetDailyTasksResponse,
} from "@/shared/types";
import { getDailyTaskType } from "@/shared/utils";

export const mapGetDailyTasksResponse = (
  data: GetDailyTasksApiResponse,
): GetDailyTasksResponse => {
  return data.map(
    ({ id, destination_id, title, is_complete, short_description, type }) => ({
      id,
      title,
      description: short_description,
      taskType: getDailyTaskType(type),
      taskId: destination_id,
      completed: is_complete,
    }),
  );
};
