import {
  type Article,
  type ArticleContentItem,
  type ArticlesState,
} from "./types";
import { type RootState } from "@/client/redux/store";
import { type StatusState } from "@/client/utils";

const selectArticlesModule = (state: RootState): ArticlesState => {
  return state.articlesReducer;
};

export const selectGetArticlesState = (state: RootState): StatusState => {
  return selectArticlesModule(state).getArticlesState;
};

export const selectArticles = (state: RootState): Article[] => {
  return selectArticlesModule(state).articles;
};

export const selectGetArticleContentState = (state: RootState): StatusState => {
  return selectArticlesModule(state).getArticleContentState;
};

export const selectArticleContent = (
  state: RootState,
): ArticleContentItem[] => {
  return selectArticlesModule(state).articleContent;
};
