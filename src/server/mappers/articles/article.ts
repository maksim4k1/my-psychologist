import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
  type GetArticlesApiResponseData,
} from "@/shared/types";

export const mapGetArticleResponse = (
  currentArticle: GetArticlesApiResponseData[number],
  articleContent: GetArticleApiResponseData,
): GetArticleResponseData => {
  const { id, theme } = currentArticle;
  return {
    id,
    title: theme,
    content: articleContent.map((el) => {
      const { id, text } = el;

      return {
        id,
        content: text,
      };
    }),
  };
};
