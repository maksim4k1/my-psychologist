import { NextResponse } from "next/server";
import { mapLoginRequest, mapLoginResponse } from "@/server/mappers/auth";
import { createRequest, setAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type LoginApiRequestData,
  type LoginApiResponseData,
  type LoginRequestData,
  type LoginResponseData,
} from "@/shared/types";

const login = createRequest(async (request, serverFetch) => {
  const body: LoginRequestData = await request.json();

  const serverResponse = await serverFetch.post<
    LoginApiResponseData,
    LoginApiRequestData
  >("/users/auth", mapLoginRequest(body));

  const data = serverResponse.data;

  const responseData = mapLoginResponse(data);

  const response = setAuthCookies(
    NextResponse.json<LoginResponseData>(responseData, httpStatuses.ok),
    data.token,
  );

  return response;
});

export const LoginRoutes = {
  POST: login,
};
