import { NextResponse } from "next/server";
import { mapGetDailyTasksResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetDailyTasksApiResponse,
  type GetDailyTasksResponse,
} from "@/shared/types";

const getDailyTasks = createRequest(async (request, serverFetch) => {
  const response =
    await serverFetch.get<GetDailyTasksApiResponse>("/daily_tasks");

  const data: GetDailyTasksResponse = mapGetDailyTasksResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const DailyTasksRoutes = {
  GET: getDailyTasks,
};
