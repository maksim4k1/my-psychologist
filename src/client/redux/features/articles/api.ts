import { BFF_API_URL } from "@/shared/config/api.config";
import {
  type GetArticleResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BFF_API_URL }),
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
