import { applicationsActions } from "@/client/redux/features/applications";
import { type AppDispatch } from "@/client/redux/store";
import { localAxios } from "@/shared/config/api.config";
import {
  type ConfirmApplicationRequestData,
  type GetApplicationResponseData,
  type GetApplicationsResponseData,
  ResponseError,
  type SendApplicationRequestData,
} from "@/shared/types";

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
    (data: ConfirmApplicationRequestData) => async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.confirmApplicationLoading());

      try {
        await localAxios.post("/applications/confirm", data);

        dispatch(applicationsActions.confirmApplicationSuccess());
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(
            applicationsActions.confirmApplicationFailure(err.serialize()),
          );
        }
      }
    };

  static sendApplication =
    (formData: SendApplicationRequestData) => async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.sendApplicationLoading());

      try {
        await localAxios.post("/applications/send", formData);

        dispatch(applicationsActions.sendApplicationSuccess());
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(applicationsActions.sendApplicationFailure(err.serialize()));
        }
      }
    };
}
