import { type StatusState } from "@/client/utils";
import {
  type GetArticleResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";

export interface ArticlesState {
  articles: GetArticlesResponseData;
  articleContent: GetArticleResponseData | null;
  getArticlesState: StatusState;
  getArticleState: StatusState;
}
