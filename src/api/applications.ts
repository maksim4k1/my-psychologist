import { applicationsActions } from "@/redux/features/applications";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import { ApplicationData } from "@/redux/features/applications/types";
import ClientsService from "./clients";

interface ApplicationResponse {
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
        dispatch(ApplicationsService.getApplications());
        dispatch(ClientsService.getClients());
      } catch (err) {
        dispatch(applicationsActions.confirmApplicationError(err));
      }
    };
}
