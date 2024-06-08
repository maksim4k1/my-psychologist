import { psychologistActions } from "@/redux/features/psychologist";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import { ApplicationData } from "@/redux/features/psychologist/types";

interface ApplicationResponse {
  client_id: string;
  online: boolean;
  problem: null | string;
  problem_id: null | string;
  text: string;
  username: string;
}

export default class PsychologistServise {
  static getApplications: Function = () => async (dispatch: AppDispatch) => {
    dispatch(psychologistActions.getApplicationsLoading());

    try {
      const response = await customAxios.get(
        "/application/get_list_applications",
      );

      const data = response.data;

      if (typeof data === "string") {
        dispatch(psychologistActions.getApplicationsError(data));
      } else {
        const formattedData: ApplicationData[] = data.map(
          (el: ApplicationResponse) => ({
            userId: el.client_id,
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            username: el.username,
            isOnline: el.online,
            problem: el.text,
          }),
        );

        dispatch(psychologistActions.getApplicationsSuccess(formattedData));
      }
    } catch (err) {
      dispatch(
        psychologistActions.getApplicationsError(
          err instanceof Error ? err.message : String(err),
        ),
      );
    }
  };
}
