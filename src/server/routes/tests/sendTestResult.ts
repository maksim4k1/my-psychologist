import { NextResponse } from "next/server";
import { mapSendTestResultRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  ResponseSuccessInfo,
  type SendTestResultApiRequestData,
  type SendTestResultRequestData,
} from "@/shared/types";

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

export const SendTestResultRotes = {
  POST: sendTestResult,
};
