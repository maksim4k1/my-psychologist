import { type AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { mapLoginResponse } from "@/server/mappers/auth";
import {
  deleteAuthCookies,
  getRequestAccessToken,
  setAuthCookies,
} from "@/server/utils";
import { ACCESS } from "@/shared/config/access";
import { serverAxios } from "@/shared/config/api";
import {
  type LoginApiResponseData,
  type LoginResponseData,
} from "@/shared/types";
import { checkAccess } from "@/shared/utils";

interface LoginByTokenResponse {
  userData: LoginResponseData;
  accessToken: string;
}

interface LoginByTokenApiRequestData {
  token: string;
}

export const loginByToken = async (
  accessToken?: string,
): Promise<LoginByTokenResponse | null> => {
  try {
    if (accessToken) {
      const body: LoginByTokenApiRequestData = { token: accessToken };

      const { data } = await serverAxios.post<
        LoginApiResponseData,
        AxiosResponse<LoginApiResponseData>,
        LoginByTokenApiRequestData
      >("/users/auth_token", body);

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
  const accessToken = getRequestAccessToken(request);
  const loginResponse = await loginByToken(accessToken);

  const userRole = loginResponse?.userData.role ?? ACCESS.unauthorized;
  const { pathname } = request.nextUrl;

  let response: NextResponse;

  const { path, operationType } = checkAccess(pathname, userRole);

  switch (operationType) {
    case "next": {
      response = NextResponse.next();
      break;
    }
    case "redirect": {
      response = NextResponse.redirect(new URL(path, request.url));
      break;
    }
    case "rewrite": {
      response = NextResponse.rewrite(new URL(path, request.url));
      break;
    }
  }

  if (loginResponse) {
    const { accessToken } = loginResponse;
    response = setAuthCookies(response, accessToken);
  } else {
    response = deleteAuthCookies(response);
  }

  return response;
};
