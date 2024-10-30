import { NextResponse } from "next/server";
import {
  mapSendApplicationRequest,
  mapUpdateUserRequest,
} from "@/server/mappers";
import { createRequest, loginByToken } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  ResponseError,
  ResponseSuccessInfo,
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
  type UpdateUserApiRequestData,
} from "@/shared/types";

const sendApplication = createRequest(async (request, serverFetch) => {
  const body: SendApplicationRequestData = await request.json();

  const loginByTokenResponse = await loginByToken(request);

  if (!loginByTokenResponse) {
    return NextResponse.json(
      new ResponseError(
        httpStatuses.unauthorized.status,
        "Время сессии истекло",
      ),
      httpStatuses.unauthorized,
    );
  }

  const sendApplicationResponse = serverFetch.post<
    any,
    SendApplicationApiRequestData
  >("/client/send_application", mapSendApplicationRequest(body));

  const updateUserResponse = serverFetch.post<any, UpdateUserApiRequestData>(
    "/users/update_user",
    mapUpdateUserRequest({
      username: body.username,
      role: loginByTokenResponse.userData.role,
    }),
  );

  await Promise.all([sendApplicationResponse, updateUserResponse]);

  return NextResponse.json(
    new ResponseSuccessInfo("Заявка отправлена"),
    httpStatuses.created,
  );
});

export const SendApplicationRoutes = {
  POST: sendApplication,
};
