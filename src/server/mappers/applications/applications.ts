import {
  type GetApplicationsApiResponseData,
  type GetApplicationsResponseData,
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
