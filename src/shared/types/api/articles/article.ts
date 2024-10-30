export interface GetArticleResponseData {
  id: string;
  title: string;
  content: {
    id: string;
    content: string;
  }[];
}

export type GetArticleApiResponseData = {
  id: string;
  text: string;
}[];
