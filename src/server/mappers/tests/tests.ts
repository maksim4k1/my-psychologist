import {
  type GetTestsApiResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

export const mapGetTestsResponse = (
  data: GetTestsApiResponseData,
): GetTestsResponseData => {
  return data.map((el) => {
    const { test_id, title, description } = el;

    return {
      id: test_id,
      title,
      description,
    };
  });
};
