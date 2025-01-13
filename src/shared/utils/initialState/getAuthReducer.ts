import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { userAgent } from "next/server";
import { loginByToken } from "@/server/utils";
import { cookies as cookiesData, initialState } from "@/shared/data";
import { type InitialState } from "@/shared/types";

export const getAuthReducer = async (
  headers: ReadonlyHeaders,
  cookies: ReadonlyRequestCookies,
) => {
  const accessToken = cookies.get(cookiesData.accessToken.name)?.value;
  const ua = userAgent({ headers });

  const loginResponse = await loginByToken(accessToken);

  if (loginResponse) {
    const { userData } = loginResponse;
    const authReducer: InitialState["authReducer"] = {
      isAuth: true,
      profile: {
        id: userData.userId,
        email: userData.email,
        username: userData.username,
        role: userData.role,
      },
      ua,
    };

    return authReducer;
  }

  return {
    ...initialState["authReducer"],
    ua,
  };
};
