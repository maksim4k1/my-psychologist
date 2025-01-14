export interface GetArticleResponseData {
  title: string;
  content: {
    id: string;
    content: string;
  }[];
}

export type GetArticleApiResponseData = {
  theme: string;
  max_score: number;
  materials: {
    id: string;
    text: string;
  }[];
};
