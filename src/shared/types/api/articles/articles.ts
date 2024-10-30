export type GetArticlesResponseData = {
  id: string;
  title: string;
  progress: number;
  fullProgress: number;
}[];

export type GetArticlesApiResponseData = {
  id: string;
  theme: string;
  score: number;
  max_score: number;
}[];
