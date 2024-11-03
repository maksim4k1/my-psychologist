import {
  type ConfirmApplicationApiRequestData,
  type ConfirmApplicationRequestData,
} from "@/shared/types";

export const mapConfirmApplicationRequest = (
  data: ConfirmApplicationRequestData,
): ConfirmApplicationApiRequestData => {
  const { userId, confirmed } = data;

  return {
    user_id: userId,
    status: confirmed,
  };
};
