import { NextResponse } from "next/server";
import { mapSendHrSurveyRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  ResponseSuccessInfo,
  type SendHrSurveyApiRequestData,
  type SendHrSurveyRequestData,
} from "@/shared/types";

const sendHrSurvey = createRequest(async (request, serverFetch) => {
  const body: SendHrSurveyRequestData = await request.json();

  await serverFetch.post<any, SendHrSurveyApiRequestData>(
    "/manager/send_manager",
    mapSendHrSurveyRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("Заявка создана"),
    httpStatuses.created,
  );
});

export const HrSurveyRoutes = {
  POST: sendHrSurvey,
};
