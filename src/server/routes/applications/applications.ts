import { NextResponse } from "next/server";
import { mapGetApplicationsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  GetApplicationsApiResponseData,
  GetApplicationsResponseData,
} from "@/shared/types";

const getApplications = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetApplicationsApiResponseData>(
    "/application/get_list_applications",
  );

  const data: GetApplicationsResponseData = mapGetApplicationsResponse(
    response.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

export const ApplicationsRoutes = {
  GET: getApplications,
};
