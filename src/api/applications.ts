import { applicationsActions } from "@/redux/features/applications";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import {
  ApplicationData,
  ApplicationProfileData,
} from "@/redux/features/applications/types";
import { calculateAge } from "@/utils/dataUtils";

interface ApplicationResponse {
  app_id: string;
  client_id: string;
  online: boolean;
  problem: null | string;
  problem_id: null | string;
  text: string;
  username: string;
}

export default class ApplicationsService {
  static getApplications: Function = () => async (dispatch: AppDispatch) => {
    dispatch(applicationsActions.getApplicationsLoading());

    try {
      const response = await customAxios.get(
        "/application/get_list_applications",
      );

      const data = response.data;

      const formattedData: ApplicationData[] = data.map(
        (el: ApplicationResponse) => ({
          id: el.app_id,
          userId: el.client_id,
          profileImage: "",
          username: el.username,
          isOnline: el.online,
          problem: el.text,
        }),
      );

      dispatch(applicationsActions.getApplicationsSuccess(formattedData));
    } catch (err) {
      dispatch(applicationsActions.getApplicationsError(err));
    }
  };

  static getApplication: Function =
    (applicationId: string) => async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.getApplicationLoading());

      try {
        const response = await customAxios.get(
          `/application/watch_application/${applicationId}`,
        );

        const data = response.data;

        const formattedData: ApplicationProfileData = {
          id: data.app_id,
          userId: data.client_id,
          profileImage: "",
          age: calculateAge(data.birth_date),
          username: data.username,
          isOnline: data.online,
          problem: data.text,
        };

        dispatch(applicationsActions.getApplicationSuccess(formattedData));
      } catch (err) {
        dispatch(applicationsActions.getApplicationFailure(err));
      }
    };

  static confirmApplication: Function =
    (userId: string, status: boolean) => async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.confirmApplicationLoading());

      try {
        const response = await customAxios.post(
          "/psychologist/confirm_application",
          {
            user_id: userId,
            status,
          },
        );

        dispatch(applicationsActions.confirmApplicationSuccess(response.data));
      } catch (err) {
        dispatch(applicationsActions.confirmApplicationError(err));
      }
    };
}
