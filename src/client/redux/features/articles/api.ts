import { api } from "../../api";
import {
  type GetArticleResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<GetArticlesResponseData, void>({
      query: () => "/articles",
    }),

    getArticleById: builder.query<GetArticleResponseData, string>({
      query: (articleId: string) => `/articles/${articleId}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleByIdQuery } = articlesApi;
