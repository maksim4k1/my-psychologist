import { NextResponse } from "next/server";
import { mapGetTestResultResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestResultApiResponseData,
  type GetTestResultResponseData,
} from "@/shared/types";

const getTestResult = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetTestResultApiResponseData>(
      `/test/get_test_result/${id}`,
    );

    const data: GetTestResultResponseData = mapGetTestResultResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const TestResultRoutes = {
  GET: getTestResult,
};
