import { type AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { mapLoginResponse } from "@/server/mappers/auth";
import { deleteAuthCookies, setAuthCookies } from "@/server/utils";
import { ACCESS } from "@/shared/config/access";
import { serverAxios } from "@/shared/config/api";
import { cookies } from "@/shared/data";
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
    const { userData, accessToken } = loginResponse;
    response = setAuthCookies(response, userData, accessToken);
  } else {
    response = deleteAuthCookies(response);
  }

  return response;
};
