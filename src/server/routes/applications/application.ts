import { NextResponse } from "next/server";
import { mapGetApplicationResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  GetApplicationApiResponseData,
  GetApplicationResponseData,
} from "@/shared/types";

const getApplication = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetApplicationApiResponseData>(
      `/application/watch_application/${id}`,
    );

    const data: GetApplicationResponseData = mapGetApplicationResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const ApplicationRoutes = {
  GET: getApplication,
};
