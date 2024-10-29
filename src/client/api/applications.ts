import { applicationsActions } from "@/client/redux/features/applications";
import { type AppDispatch } from "@/client/redux/store";
import { type AccessRole } from "@/shared/config/access.config";
import { customAxios, localAxios } from "@/shared/config/api.config";
import {
  GetApplicationResponseData,
  GetApplicationsResponseData,
  ResponseError,
} from "@/shared/types";
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
        const { data } = await localAxios.get<GetApplicationResponseData>(
          `/applications/${applicationId}`,
        );

        dispatch(applicationsActions.getApplicationSuccess(data));
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(applicationsActions.getApplicationFailure(err.serialize()));
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
