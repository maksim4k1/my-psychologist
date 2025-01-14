import { NextResponse } from "next/server";
import { mapGetArticleResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
} from "@/shared/types";

const getArticle = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const articleResponse = await serverFetch.get<GetArticleApiResponseData>(
      `/education/get_all_education_material/${id}`,
    );

    const data: GetArticleResponseData = mapGetArticleResponse(
      articleResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const ArticleRoutes = {
  GET: getArticle,
};
