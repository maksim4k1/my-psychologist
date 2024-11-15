import { NextResponse } from "next/server";
import {
  mapGetApplicationsResponse,
  mapSendApplicationRequest,
  mapUpdateUserRequest,
} from "@/server/mappers";
import {
  createRequest,
  getRequestAccessToken,
  loginByToken,
} from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetApplicationsApiResponseData,
  type GetApplicationsResponseData,
  ResponseError,
  ResponseSuccessInfo,
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
  type UpdateUserApiRequestData,
} from "@/shared/types";

const getApplications = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetApplicationsApiResponseData>(
    "/application/get_list_applications",
  );

  const data: GetApplicationsResponseData = mapGetApplicationsResponse(
    response.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

const sendApplication = createRequest(async (request, serverFetch) => {
  const body: SendApplicationRequestData = await request.json();
  const accessToken = getRequestAccessToken(request);

  const loginByTokenResponse = await loginByToken(accessToken);

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

  const updateUserResponse = serverFetch.patch<any, UpdateUserApiRequestData>(
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

export const ApplicationsRoutes = {
  GET: getApplications,
  POST: sendApplication,
};
