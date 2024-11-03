import { NextResponse } from "next/server";
import { mapGetTestResultResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestApiResponseData,
  type GetTestResultApiResponseData,
  type GetTestResultResponseData,
} from "@/shared/types";

const getTestResult = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const testResultResponse =
      await serverFetch.get<GetTestResultApiResponseData>(
        `/test/get_test_result/${id}`,
      );

    const testResponse = await serverFetch.get<GetTestApiResponseData>(
      `/test/get_test_info/${testResultResponse.data.test_id}`,
    );

    const data: GetTestResultResponseData = mapGetTestResultResponse(
      testResponse.data,
      testResultResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const TestResultRoutes = {
  GET: getTestResult,
};
