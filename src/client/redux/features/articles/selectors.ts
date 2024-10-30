import { type ArticlesState } from "./types";
import { type RootState } from "@/client/redux/store";
import { type StatusState } from "@/client/utils";
import { type GetArticlesResponseData } from "@/shared/types";

const selectArticlesModule = (state: RootState): ArticlesState => {
  return state.articlesReducer;
};

export const selectGetArticlesState = (state: RootState): StatusState => {
  return selectArticlesModule(state).getArticlesState;
};

export const selectArticles = (state: RootState): GetArticlesResponseData => {
  return selectArticlesModule(state).articles;
};

export const selectGetArticleContentState = (state: RootState): StatusState => {
  return selectArticlesModule(state).getArticleState;
};

export const selectArticleContent = (state: RootState) => {
  return selectArticlesModule(state).articleContent;
};
