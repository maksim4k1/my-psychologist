import {
  type GetPsychologistsApiResponseData,
  type GetPsychologistsResponseData,
} from "@/shared/types";

export const mapGetPsychologistsResponse = (
  data: GetPsychologistsApiResponseData,
): GetPsychologistsResponseData => {
  return data.map((el) => {
    const { id, username, online } = el;

    return {
      userId: id,
      username,
      isOnline: online,
      profileImage: "",
    };
  });
};
