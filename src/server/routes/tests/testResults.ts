import { NextResponse } from "next/server";
import {
  mapGetTestResultsResponse,
  mapSendTestResultRequest,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestResultsApiResponseData,
  type GetTestResultsResponseData,
  ResponseSuccessInfo,
  type SendTestResultApiRequestData,
  type SendTestResultRequestData,
} from "@/shared/types";

const getTestResults = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const userId = request.nextUrl.searchParams.get("user_id");
    const response = await serverFetch.get<GetTestResultsApiResponseData>(
      `/test/get_test_results/${id}${userId ? `?user_id=${userId}` : ""}`,
    );

    const data: GetTestResultsResponseData = mapGetTestResultsResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

const sendTestResult = createRequest(async (request, serverFetch) => {
  const body: SendTestResultRequestData = await request.json();

  await serverFetch.post<any, SendTestResultApiRequestData>(
    "/test/save_test_result",
    mapSendTestResultRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("Результат успешно отправлен"),
    httpStatuses.ok,
  );
});

export const TestResultsRoutes = {
  GET: getTestResults,
  POST: sendTestResult,
};
