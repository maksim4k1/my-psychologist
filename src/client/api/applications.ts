import { applicationsActions } from "@/client/redux/features/applications";
import { type ApplicationProfileData } from "@/client/redux/features/applications/types";
import { type AppDispatch } from "@/client/redux/store";
import { calculateAge } from "@/client/utils";
import { type AccessRole } from "@/shared/config/access.config";
import { customAxios, localAxios } from "@/shared/config/api.config";
import { GetApplicationsResponseData, ResponseError } from "@/shared/types";
import { getRoleId, instanceofHttpError } from "@/shared/utils/api";

export class ApplicationsService {
  static getApplications = () => async (dispatch: AppDispatch) => {
    dispatch(applicationsActions.getApplicationsLoading());

    try {
      const { data } =
        await localAxios.get<GetApplicationsResponseData>("/applications");

      dispatch(applicationsActions.getApplicationsSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(applicationsActions.getApplicationsFailure(err.serialize()));
      }
    }
  };

  static getApplication =
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
        if (instanceofHttpError(err)) {
          dispatch(applicationsActions.getApplicationFailure(err));
        }
      }
    };

  static confirmApplication =
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
        if (instanceofHttpError(err)) {
          dispatch(applicationsActions.confirmApplicationFailure(err));
        }
      }
    };

  static sendApplication =
    (
      psychologistId: string,
      role: AccessRole,
      fullName: string,
      request: string,
    ) =>
    async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.sendApplicationLoading());

      try {
        const sendApplicationResponse = customAxios.post(
          "/client/send_application",
          {
            user_id: psychologistId,
            text: request,
          },
        );

        const editFullNameResponse = customAxios.post("/users/update_user", {
          birth_date: "2000-01-01",
          gender: "1",
          username: fullName,
          request: [1],
          city: "",
          description: "",
          type: getRoleId(role),
        });

        await Promise.all([sendApplicationResponse, editFullNameResponse]);

        dispatch(applicationsActions.sendApplicationSuccess());
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(applicationsActions.sendApplicationFailure(err));
        }
      }
    };
}
