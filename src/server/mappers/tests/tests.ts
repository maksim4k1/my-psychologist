import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetTestsApiResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

export const mapGetTestsResponse = (
  data: GetTestsApiResponseData,
): GetTestsResponseData => {
  return data.map((el) => {
    const { test_id, title, description, link_to_picture } = el;

    return {
      id: test_id,
      title,
      description,
      image: `${SEVER_API_URL}/test/images_test/${link_to_picture}`,
    };
  });
};
