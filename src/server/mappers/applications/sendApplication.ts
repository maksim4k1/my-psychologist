import {
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
} from "@/shared/types";

export const mapSendApplicationRequest = (
  data: SendApplicationRequestData,
): SendApplicationApiRequestData => {
  const { psychologistId, request } = data;

  return {
    user_id: psychologistId,
    text: request,
  };
};
