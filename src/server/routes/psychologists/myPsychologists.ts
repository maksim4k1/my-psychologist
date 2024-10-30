import { NextResponse } from "next/server";
import { mapGetPsychologistsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetPsychologistsApiResponseData,
  type GetPsychologistsResponseData,
} from "@/shared/types";

const getMyPsychologists = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetPsychologistsApiResponseData>(
    "/client/get_your_psychologist",
  );

  const data: GetPsychologistsResponseData = mapGetPsychologistsResponse(
    response.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

export const MyPsychologistsRoutes = {
  GET: getMyPsychologists,
};
