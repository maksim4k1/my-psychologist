import { NextResponse } from "next/server";
import { mapGetTestsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestsApiResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

const getTests = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetTestsApiResponseData>(
    "/test/get_all_tests",
  );

  const data: GetTestsResponseData = mapGetTestsResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const TestsRoutes = {
  GET: getTests,
};
