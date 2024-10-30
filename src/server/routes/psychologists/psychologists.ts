import { NextResponse } from "next/server";
import { mapGetPsychologistsResponse } from "@/server/mappers";
import { createRequest, loginByToken } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetPsychologistsApiResponseData,
  type GetPsychologistsResponseData,
  ResponseError,
} from "@/shared/types";

const getPsychologists = createRequest(async (request, serverFetch) => {
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

  const psychologistsPromise = serverFetch.get<GetPsychologistsApiResponseData>(
    "/manager/get_all_manager",
  );

  const myPsychologistsPromise =
    serverFetch.get<GetPsychologistsApiResponseData>(
      "/client/get_your_psychologist",
    );

  const [psychologistsResponse, myPsychologistsResponse] = await Promise.all([
    psychologistsPromise,
    myPsychologistsPromise,
  ]);

  const filteredPsychologists = psychologistsResponse.data.filter(
    (el) =>
      myPsychologistsResponse.data.findIndex((val) => el.id === val.id) ===
        -1 && el.id !== loginByTokenResponse.userData.userId,
  );

  const psychologistsResponseData: GetPsychologistsResponseData =
    mapGetPsychologistsResponse(filteredPsychologists);

  return NextResponse.json(psychologistsResponseData, httpStatuses.ok);
});

export const PsychologistsRoutes = {
  GET: getPsychologists,
};
