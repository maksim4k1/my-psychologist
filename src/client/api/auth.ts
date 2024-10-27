import { type AppDispatch } from "./../redux/store";
import { authActions } from "@/client/redux/features/auth/";
import {
  type LoginPayload,
  type RegistrationPayload,
  type SendHrSurveyPayload,
} from "@/client/redux/features/auth/types";
import { customAxios, localAxios } from "@/shared/config/api.config";
import { instanceofHttpError } from "@/shared/utils/api";

export default class AuthService {
  static login = (formData: LoginPayload) => async (dispatch: AppDispatch) => {
    dispatch(authActions.loginLoading());
    try {
      const response = await localAxios.post("/login", formData);

      const data = response.data;

      dispatch(authActions.loginSuccess(data));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(authActions.loginFailure(err));
      }
    }
  };

  static registration =
    (formData: RegistrationPayload) => async (dispatch: AppDispatch) => {
      dispatch(authActions.registrationLoading());

      try {
        const response = await localAxios.post("/registration", {
          email: formData.email,
          username: formData.name,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        });

        const data = response.data;

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
      await localAxios.post("/logout");

      dispatch(authActions.logoutSuccess());
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(authActions.logoutFailure(err));
      }
    }
  };

  static sendHrSurvey =
    (formData: SendHrSurveyPayload) => async (dispatch: AppDispatch) => {
      dispatch(authActions.sendHrSurveyLoading());

      try {
        const response = await customAxios.post("/manager/send_manager", {
          username: formData.fullName,
          description: "",
          city: "",
          company: formData.company,
          online: false,
          gender: "1",
          birth_date: "2000-01-01",
        });

        const data = response.data;

        dispatch(authActions.sendHrSurveySuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(authActions.sendHrSurveyFailure(err));
        }
      }
    };
}
