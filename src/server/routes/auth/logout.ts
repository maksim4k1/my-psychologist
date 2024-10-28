import { NextResponse } from "next/server";
import { deleteAuthCookies } from "@/server/utils";

const logout = async () => {
  const response = deleteAuthCookies(NextResponse.json({ message: "OK" }));

  return response;
};

export const LogoutRoutes = {
  POST: logout,
};
