import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type ResetPasswordRequestData,
  ResponseSuccessInfo,
} from "@/shared/types";

const resetPassword = createRequest(async (request, serverFetch) => {
  const body: ResetPasswordRequestData = await request.json();

  await serverFetch.post<ResetPasswordRequestData>(
    "/users/reset_password_request",
    body,
  );

  const response = NextResponse.json(
    new ResponseSuccessInfo("Email successful sent"),
    httpStatuses.ok,
  );

  return response;
});

export const ResetPasswordRoutes = {
  POST: resetPassword,
};
