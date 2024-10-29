import { NextResponse } from "next/server";
import {
  mapRegistrationRequest,
  mapRegistrationResponse,
} from "@/server/mappers/auth";
import { createRequest, setAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type RegistrationApiRequestData,
  type RegistrationApiResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
} from "@/shared/types";

const registration = createRequest<
  RegistrationApiResponseData,
  RegistrationApiRequestData
>("post", async (request, serverFetch) => {
  const body: RegistrationRequestData = await request.json();

  const serverResponse = await serverFetch(
    "/users/reg",
    mapRegistrationRequest(body),
  );

  const data = serverResponse.data;

  const responseData = mapRegistrationResponse(data);

  const response = setAuthCookies(
    NextResponse.json<RegistrationResponseData>(
      responseData,
      httpStatuses.created,
    ),
    responseData,
    data.token,
  );

  return response;
});

export const RegistrationRoutes = {
  POST: registration,
};
