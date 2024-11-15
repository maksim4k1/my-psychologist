import { type NextRequest, type NextResponse } from "next/server";
import { cookies, deleteCookieParams } from "@/shared/data";

export const setAuthCookies = (
  response: NextResponse,
  accessToken: string,
): NextResponse => {
  response.cookies.set(
    cookies.accessToken.name,
    accessToken,
    cookies.accessToken.params,
  );

  return response;
};

export const deleteAuthCookies = (response: NextResponse): NextResponse => {
  response.cookies.set(cookies.accessToken.name, "", deleteCookieParams);

  return response;
};

export const getRequestAccessToken = (
  request: NextRequest,
): string | undefined => {
  const accessToken = request.cookies.get(cookies.accessToken.name)?.value;

  return accessToken;
};
