import { NextResponse } from "next/server";
import { mapConfirmApplicationRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type ConfirmApplicationApiRequestData,
  type ConfirmApplicationRequestData,
  ResponseSuccessInfo,
} from "@/shared/types";

const confirmApplication = createRequest(async (request, serverFetch) => {
  const body: ConfirmApplicationRequestData = await request.json();

  await serverFetch.post<any, ConfirmApplicationApiRequestData>(
    "/psychologist/confirm_application",
    mapConfirmApplicationRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("Статус заявки обновлен"),
    httpStatuses.ok,
  );
});

export const ConfirmApplicationRoutes = {
  POST: confirmApplication,
};
