import { type AppDispatch, authActions } from "@/client/redux";
import { localAxios } from "@/shared/config/api.config";
import {
  type RegistrationRequestData,
  type RegistrationResponseData,
  ResponseError,
  type SendHrSurveyRequestData,
} from "@/shared/types";

export class AuthService {
  static registration =
    (formData: RegistrationRequestData) => async (dispatch: AppDispatch) => {
      dispatch(authActions.registrationLoading());

      try {
        const { data } = await localAxios.post<RegistrationResponseData>(
          "/auth/registration",
          formData,
        );

        dispatch(authActions.registrationSuccess(data));
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(authActions.registrationFailure(err.serialize()));
        }
      }
    };

  static logout = () => async (dispatch: AppDispatch) => {
    dispatch(authActions.logoutLoading());
    try {
      await localAxios.post("/auth/logout");

      dispatch(authActions.logoutSuccess());
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(authActions.logoutFailure(err.serialize()));
      }
    }
  };

  static sendHrSurvey =
    (formData: SendHrSurveyRequestData) => async (dispatch: AppDispatch) => {
      dispatch(authActions.sendHrSurveyLoading());

      try {
        await localAxios.post("/hr/survey", formData);

        dispatch(authActions.sendHrSurveySuccess());
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(authActions.sendHrSurveyFailure(err.serialize()));
        }
      }
    };
}
