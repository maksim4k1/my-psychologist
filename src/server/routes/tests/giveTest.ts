import { NextResponse } from "next/server";
import { mapGiveTestRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GiveTestApiRequestData,
  type GiveTestRequestData,
  ResponseError,
  ResponseSuccessInfo,
} from "@/shared/types";

const giveTest = createRequest(async (request, serverFetch) => {
  const body: GiveTestRequestData = await request.json();

  const response = await serverFetch.post<any, GiveTestApiRequestData>(
    "/manager/give_task",
    mapGiveTestRequest(body),
  );

  if (response.data !== "Successfully") {
    return NextResponse.json(
      new ResponseError(
        httpStatuses.internalServerError.status,
        "Что-то пошло не так, попробуйте повторить позже",
      ),
      httpStatuses.internalServerError,
    );
  }

  return NextResponse.json(
    new ResponseSuccessInfo("Операция успешно выполнена"),
    httpStatuses.ok,
  );
});

export const GiveTestRoutes = {
  POST: giveTest,
};
