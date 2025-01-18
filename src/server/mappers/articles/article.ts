import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
  type ReadArticleApiRequestData,
} from "@/shared/types";

export const mapGetArticleResponse = (
  articleContent: GetArticleApiResponseData,
): GetArticleResponseData => {
  const { materials, theme } = articleContent;

  return {
    title: theme,
    content: materials.map((el) => {
      const { id, text } = el;

      return {
        id,
        content: text,
      };
    }),
  };
};

export const mapReadArticleRequest = (
  id: string,
): ReadArticleApiRequestData => {
  return {
    education_material_id: id,
  };
};
