import { type NextResponse } from "next/server";
import { type UserData } from "@/client/redux/features/auth/types";
import { cookies, deleteCookieParams } from "@/shared/data";

export const setAuthCookies = (
  response: NextResponse,
  userData: UserData,
): NextResponse => {
  response.cookies.set(
    cookies.authToken.name,
    userData.token,
    cookies.authToken.params,
  );
  response.cookies.set(
    cookies.userData.name,
    JSON.stringify(userData),
    cookies.userData.params,
  );

  return response;
};

export const deleteAuthCookies = (response: NextResponse): NextResponse => {
  response.cookies.set(cookies.authToken.name, "", deleteCookieParams);
  response.cookies.set(cookies.userData.name, "", deleteCookieParams);

  return response;
};
