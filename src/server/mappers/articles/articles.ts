import {
  type GetArticlesApiResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";

export const mapGetArticlesResponse = (
  data: GetArticlesApiResponseData,
): GetArticlesResponseData => {
  return data.map((el) => {
    const { id, theme, score, max_score } = el;

    return {
      id,
      title: theme,
      progress: score,
      fullProgress: max_score,
    };
  });
};
