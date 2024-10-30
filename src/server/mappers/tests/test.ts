import {
  type GetTestApiResponseData,
  type GetTestResponseData,
} from "@/shared/types";

export const mapGetTestResponse = (
  data: GetTestApiResponseData,
): GetTestResponseData => {
  const { test_id, title, description, short_desc, scales } = data;

  return {
    id: test_id,
    title: title,
    description: description,
    shortDescription: short_desc,
    scales: scales.map(({ scale_id, title, min, max, borders }) => ({
      id: scale_id,
      title: title,
      min: min,
      max: max,
      borders: borders
        .map(({ title, left_border, right_border, color }) => ({
          title: title,
          leftBorder: left_border,
          rightBorder: right_border,
          color: color,
        }))
        .sort((a, b) => a.leftBorder - b.leftBorder),
    })),
  };
};
