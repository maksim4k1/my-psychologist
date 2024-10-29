import {
  type ConfirmApplicationApiRequestData,
  type ConfirmApplicationRequestData,
} from "@/shared/types";

export const mapConfirmApplicationRequest = (
  data: ConfirmApplicationRequestData,
): ConfirmApplicationApiRequestData => {
  const { userId, confirm } = data;

  return {
    user_id: userId,
    status: confirm,
  };
};
