import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { ResponseSuccessInfo } from "@/shared/types";

const maskFeedbackAsReaded = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    await serverFetch.patch(`/review/read/${id}`);

    return NextResponse.json(
      new ResponseSuccessInfo("Отзыв помечен как прочитанный"),
      httpStatuses.ok,
    );
  },
);

const deleteFeedback = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    await serverFetch.delete(`/review/delete/${id}`);

    return NextResponse.json(
      new ResponseSuccessInfo("Отзыв успешно удален"),
      httpStatuses.ok,
    );
  },
);

export const FeedbackRoutes = {
  PATCH: maskFeedbackAsReaded,
  DELETE: deleteFeedback,
};
