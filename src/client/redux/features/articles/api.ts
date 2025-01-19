import { api } from "../../api";
import {
  type GetArticleResponseData,
  type GetArticlesResponseData,
  type ResponseSuccessInfo,
} from "@/shared/types";

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<GetArticlesResponseData, void>({
      query: () => "/articles",
    }),

    getArticleById: builder.query<GetArticleResponseData, string>({
      query: (articleId: string) => `/articles/${articleId}`,
    }),

    readArticle: builder.mutation<ResponseSuccessInfo, string>({
      query: (articleId: string) => ({
        url: `/articles/${articleId}`,
        method: "POST",
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useReadArticleMutation,
} = articlesApi;
