import {
  type GiveTestApiRequestData,
  type GiveTestRequestData,
} from "@/shared/types";

export const mapGiveTestRequest = (
  data: GiveTestRequestData,
): GiveTestApiRequestData => {
  const { userId, testId } = data;

  return {
    user_id: userId,
    test_id: testId,
    test_title: "",
    text: "Задание для выполнения",
  };
};
