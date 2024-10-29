import { type AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { mapLoginResponse } from "@/server/mappers/auth";
import { deleteAuthCookies, setAuthCookies } from "@/server/utils";
import { ACCESS } from "@/shared/config/access.config";
import { serverAxios } from "@/shared/config/api.config";
import { cookies, errorPages, pages, routes } from "@/shared/data";
import {
  type LoginApiResponseData,
  type LoginResponseData,
} from "@/shared/types";

const checkPath = (pathname: string, template: string): boolean => {
  const pathDivider = "/";
  const paramIdentifier = ":";

  const pathElements = pathname.split(pathDivider);
  const templateElements = template.split(pathDivider);

  if (pathElements.length !== templateElements.length) return false;

  const pathElRegExp = /[A-Za-z0-9-_.~%]/i;
  const n = pathElements.length;

  for (let i = 0; i < n; i++) {
    const pathEl = pathElements[i];
    const templateEl = templateElements[i];

    if (templateEl[0] === paramIdentifier) {
      if (!pathElRegExp.test(pathEl)) return false;
    } else if (pathEl !== templateEl) return false;
  }

  return true;
};

interface LoginByTokenResponse {
  userData: LoginResponseData;
  accessToken: string;
}

interface LoginByTokenApiRequestData {
  token: string;
}

const loginByToken = async (
  request: NextRequest,
): Promise<LoginByTokenResponse | null> => {
  try {
    const accessToken = request.cookies.get(cookies.accessToken.name)?.value;

    if (accessToken) {
      const body: LoginByTokenApiRequestData = { token: accessToken };

      const response = await serverAxios.post<
        LoginApiResponseData,
        AxiosResponse<LoginApiResponseData>,
        LoginByTokenApiRequestData
      >("/users/auth_token", body);

      const { data } = response;

      return {
        userData: mapLoginResponse(data),
        accessToken: data.token,
      };
    } else return null;
  } catch {
    return null;
  }
};

export const checkAuth = async (
  request: NextRequest,
): Promise<NextResponse> => {
  const loginResponse = await loginByToken(request);
  const userRole = loginResponse?.userData.role ?? ACCESS.unauthorized;
  const { pathname } = request.nextUrl;

  let response: NextResponse = NextResponse.rewrite(
    new URL(errorPages.notFound.path, request.url),
  );

  for (const route of routes) {
    const { path, access } = route;

    if (checkPath(pathname, path)) {
      if (!access || access.includes(userRole)) response = NextResponse.next();
      else {
        if (access.length === 1 && access[0] === ACCESS.unauthorized) {
          response = NextResponse.redirect(
            new URL(pages.profile.path, request.url),
          );
        } else if (userRole === ACCESS.unauthorized) {
          response = NextResponse.redirect(
            new URL(pages.login.path, request.url),
          );
        } else {
          response = NextResponse.rewrite(
            new URL(errorPages.accessDenied.path, request.url),
          );
        }
      }
      break;
    }
  }

  if (loginResponse) {
    const { userData, accessToken } = loginResponse;
    response = setAuthCookies(response, userData, accessToken);
  } else {
    response = deleteAuthCookies(response);
  }

  return response;
};
