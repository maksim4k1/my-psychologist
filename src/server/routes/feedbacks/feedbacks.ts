import { NextResponse } from "next/server";
import { mapGetFeedbacksResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import {
  type GetFeedbacksApiResponseData,
  type GetFeedbacksResponseData,
} from "@/shared/types";

const getFeedbacks = createRequest(async (request, serverFetch) => {
  const response =
    await serverFetch.get<GetFeedbacksApiResponseData>("/review/get");

  const data: GetFeedbacksResponseData = mapGetFeedbacksResponse(response.data);

  return NextResponse.json(data);
});

export const FeedbacksRoutes = {
  GET: getFeedbacks,
};
