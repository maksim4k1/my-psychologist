import { type NextRequest, NextResponse } from "next/server";
import {
  mapRegistrationRequest,
  mapRegistrationResponse,
} from "@/server/mappers/auth";
import { setAuthCookies } from "@/server/utils";
import { customAxios } from "@/shared/config/api.config";
import {
  type RegistrationApiResponseData,
  type RegistrationRequestData,
} from "@/shared/types";

const registration = async (request: NextRequest) => {
  try {
    const body: RegistrationRequestData = await request.json();

    const serverResponse = await customAxios.post<RegistrationApiResponseData>(
      "/users/reg",
      mapRegistrationRequest(body),
    );

    const data = serverResponse.data;

    const response = setAuthCookies(
      NextResponse.json(data, { status: 200 }),
      mapRegistrationResponse(data),
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

export const RegistrationRoutes = {
  POST: registration,
};
