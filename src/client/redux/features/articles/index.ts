import { type ArticlesState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils";
import { type HttpError } from "@/shared/config/api.config";
import {
  type GetArticleResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ArticlesState = {
  articles: [],
  articleContent: null,
  getArticlesState: createDefaultState(),
  getArticleState: createDefaultState(),
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getArticlesLoading: (state) => {
      state.getArticlesState = createLoadingState();
    },
    getArticlesSuccess: (
      state,
      { payload }: PayloadAction<GetArticlesResponseData>,
    ) => {
      state.getArticlesState = createSuccessState();
      state.articles = payload;
    },
    getArticlesFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getArticlesState = createFailureState(payload);
    },
    getArticlesDefaultState: (state) => {
      state.getArticlesState = createDefaultState();
    },

    getArticleLoading: (state) => {
      state.getArticleState = createLoadingState();
    },
    getArticleSuccess: (
      state,
      { payload }: PayloadAction<GetArticleResponseData>,
    ) => {
      state.getArticleState = createSuccessState();
      state.articleContent = payload;
    },
    getArticleFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getArticleState = createFailureState(payload);
    },
    getArticleDefaultState: (state) => {
      state.getArticleState = createDefaultState();
    },
  },
});

export const articlesActions = articlesSlice.actions;

export const articlesReducer = articlesSlice.reducer;

export * from "./selectors";
export * from "./types";
