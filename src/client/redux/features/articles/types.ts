import { type StatusState } from "@/client/utils/stateCreators";

export interface Article {
  id: string;
  title: string;
  progress: number;
  fullProgress: number;
}

export interface ArticleContentItem {
  id: string;
  text: string;
}

export interface ArticlesState {
  articles: Article[];
  articleContent: ArticleContentItem[];
  getArticlesState: StatusState;
  getArticleContentState: StatusState;
}
