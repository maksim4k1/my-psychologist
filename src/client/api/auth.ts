import { type AppDispatch } from "./../redux/store";
import { authActions } from "@/client/redux/features/auth/";
import { localAxios } from "@/shared/config/api.config";
import {
  type LoginRequestData,
  type LoginResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
  type SendHrSurveyRequestData,
} from "@/shared/types";
import { instanceofHttpError } from "@/shared/utils/api";

export class AuthService {
  static login =
    (formData: LoginRequestData) => async (dispatch: AppDispatch) => {
      dispatch(authActions.loginLoading());
      try {
        const { data } = await localAxios.post<LoginResponseData>(
          "/auth/login",
          formData,
        );

        dispatch(authActions.loginSuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(authActions.loginFailure(err));
        }
      }
    };

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
        if (instanceofHttpError(err)) {
          dispatch(authActions.registrationFailure(err));
        }
      }
    };

  static logout = () => async (dispatch: AppDispatch) => {
    dispatch(authActions.logoutLoading());
    try {
      const { data } = await localAxios.post("/auth/logout");

      dispatch(authActions.logoutSuccess(data));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(authActions.logoutFailure(err));
      }
    }
  };

  static sendHrSurvey =
    (formData: SendHrSurveyRequestData) => async (dispatch: AppDispatch) => {
      dispatch(authActions.sendHrSurveyLoading());

      try {
        const { data } = await localAxios.post("/hr/survey", formData);

        dispatch(authActions.sendHrSurveySuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(authActions.sendHrSurveyFailure(err));
        }
      }
    };
}
