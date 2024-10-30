import { type NextResponse } from "next/server";
import { cookies, deleteCookieParams } from "@/shared/data";
import {
  type LoginResponseData,
  type RegistrationResponseData,
} from "@/shared/types";

export const setAuthCookies = (
  response: NextResponse,
  userData: LoginResponseData | RegistrationResponseData,
  accessToken: string,
): NextResponse => {
  response.cookies.set(
    cookies.accessToken.name,
    accessToken,
    cookies.accessToken.params,
  );
  response.cookies.set(
    cookies.userData.name,
    JSON.stringify(userData),
    cookies.userData.params,
  );

  return response;
};

export const deleteAuthCookies = (response: NextResponse): NextResponse => {
  response.cookies.set(cookies.accessToken.name, "", deleteCookieParams);
  response.cookies.set(cookies.userData.name, "", deleteCookieParams);

  return response;
};
