import { type NextRequest, NextResponse } from "next/server";
import { mapLoginRequest, mapLoginResponse } from "@/server/mappers/auth";
import { setAuthCookies } from "@/server/utils";
import { customAxios } from "@/shared/config/api.config";
import {
  type LoginApiResponseData,
  type LoginRequestData,
} from "@/shared/types";

const login = async (request: NextRequest) => {
  try {
    const body: LoginRequestData = await request.json();

    const serverResponse = await customAxios.post<LoginApiResponseData>(
      "/users/auth",
      mapLoginRequest(body),
    );

    const data = serverResponse.data;

    const response = setAuthCookies(
      NextResponse.json(data, { status: 200 }),
      mapLoginResponse(data),
      data.token,
    );

    return response;
  } catch {
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 },
    );
  }
};

export const LoginRoutes = {
  POST: login,
};
