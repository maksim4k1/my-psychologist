import {
  type GetClientsApiResponseData,
  type GetClientsResponseData,
} from "@/shared/types";

export const mapGetClientsResponse = (
  data: GetClientsApiResponseData,
): GetClientsResponseData => {
  return data.map((el) => {
    const { client_id, username, is_active, request } = el;

    return {
      userId: client_id,
      username,
      isOnline: is_active,
      problems: request,
      profileImage: "",
    };
  });
};
