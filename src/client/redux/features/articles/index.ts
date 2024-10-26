import {
  type Article,
  type ArticleContentItem,
  type ArticlesState,
} from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils/stateCreators";
import { type HttpError } from "@/shared/config/api.config";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ArticlesState = {
  articles: [],
  articleContent: [],
  getArticlesState: createDefaultState(),
  getArticleContentState: createDefaultState(),
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getArticlesLoading: (state) => {
      state.getArticlesState = createLoadingState();
    },
    getArticlesSuccess: (state, { payload }: PayloadAction<Article[]>) => {
      state.getArticlesState = createSuccessState();
      state.articles = payload;
    },
    getArticlesFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getArticlesState = createFailureState(payload);
    },
    getArticlesDefaultState: (state) => {
      state.getArticlesState = createDefaultState();
    },

    getArticleContentLoading: (state) => {
      state.getArticleContentState = createLoadingState();
    },
    getArticleContentSuccess: (
      state,
      { payload }: PayloadAction<ArticleContentItem[]>,
    ) => {
      state.getArticleContentState = createSuccessState();
      state.articleContent = payload;
    },
    getArticleContentFailure: (
      state,
      { payload }: PayloadAction<HttpError>,
    ) => {
      state.getArticleContentState = createFailureState(payload);
    },
    getArticleContentDefaultState: (state) => {
      state.getArticleContentState = createDefaultState();
    },
  },
});

export const articlesActions = articlesSlice.actions;

export default articlesSlice.reducer;
