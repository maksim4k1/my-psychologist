import { NextResponse } from "next/server";
import { mapChangePasswordRequest } from "@/server/mappers/auth/changePassword";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { ResponseSuccessInfo } from "@/shared/types";
import {
  type ChangePasswordApiRequestData,
  type ChangePasswordRequestData,
} from "@/shared/types/api/auth/changePassword";

const changePassword = createRequest(async (request, serverFetch) => {
  const body: ChangePasswordRequestData = await request.json();

  await serverFetch.post<ChangePasswordApiRequestData>(
    "/users/reset_password",
    mapChangePasswordRequest(body),
  );

  const response = NextResponse.json(
    new ResponseSuccessInfo("Password successful changed"),
    httpStatuses.ok,
  );

  return response;
});

export const ChangePasswordRoutes = {
  POST: changePassword,
};
