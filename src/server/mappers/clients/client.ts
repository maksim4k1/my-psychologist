import {
  type GetClientApiResponseData,
  type GetClientResponseData,
} from "@/shared/types";
import { calculateAge } from "@/shared/utils";

export const mapGetClientResponse = (
  data: GetClientApiResponseData,
): GetClientResponseData => {
  const { client_id, username, is_active, request, birth_date } = data;

  return {
    userId: client_id,
    username,
    isOnline: is_active,
    problems: request,
    profileImage: "",
    age: calculateAge(birth_date),
  };
};
