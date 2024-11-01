import {
  type GetApplicationsApiResponseData,
  type GetApplicationsResponseData,
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
} from "@/shared/types";

export const mapGetApplicationsResponse = (
  data: GetApplicationsApiResponseData,
): GetApplicationsResponseData => {
  return data.map((el) => {
    const { app_id, client_id, online, text, username } = el;

    return {
      id: app_id,
      userId: client_id,
      username,
      isOnline: online,
      problem: text,
      profileImage: "",
    };
  });
};

export const mapSendApplicationRequest = (
  data: SendApplicationRequestData,
): SendApplicationApiRequestData => {
  const { psychologistId, request } = data;

  return {
    user_id: psychologistId,
    text: request,
  };
};
