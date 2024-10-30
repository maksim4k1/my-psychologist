import { NextResponse } from "next/server";
import { mapGetTestsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestsApiResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

const getUserPassedTests = createRequest<{ userId: string }>(
  async (request, serverFetch, { userId }) => {
    const response = await serverFetch.get<GetTestsApiResponseData>(
      `/test/get_passed_tests/${userId}`,
    );

    const data: GetTestsResponseData = mapGetTestsResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const UserPassedTestsRoutes = {
  GET: getUserPassedTests,
};
