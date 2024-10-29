import {
  type GetApplicationApiResponseData,
  type GetApplicationResponseData,
} from "@/shared/types";
import { calculateAge } from "@/shared/utils";

export const mapGetApplicationResponse = (
  data: GetApplicationApiResponseData,
): GetApplicationResponseData => {
  const { app_id, client_id, is_active, text, username, birth_date } = data;

  return {
    id: app_id,
    userId: client_id,
    username,
    age: calculateAge(birth_date),
    isOnline: is_active,
    problem: text,
    profileImage: "",
  };
};
