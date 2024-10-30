import { NextResponse } from "next/server";
import { mapGetArticlesResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetArticlesApiResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";

const getArticles = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetArticlesApiResponseData>(
    "/education/get_all_theme",
  );

  const data: GetArticlesResponseData = mapGetArticlesResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const ArticlesRoutes = {
  GET: getArticles,
};
