import { NextResponse } from "next/server";
import { deleteAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { ResponseSuccessInfo } from "@/shared/types";

const logout = async () => {
  const response = deleteAuthCookies(
    NextResponse.json(
      new ResponseSuccessInfo("Successful logout"),
      httpStatuses.ok,
    ),
  );

  return response;
};

export const LogoutRoutes = {
  POST: logout,
};
