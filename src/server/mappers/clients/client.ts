import { calculateAge } from "@/client/utils";
import {
  GetClientApiResponseData,
  GetClientResponseData,
} from "@/shared/types";

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
