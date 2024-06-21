import { LoginPayload, RegisterPayload } from "@/redux/features/auth/types";
import { AppDispatch } from "./../redux/store";
import { authActions } from "@/redux/features/auth/";
import { customAxios } from "../../config/api.config";
import { deleteToken, saveToken } from "@/storage/token";

export default class AuthService {
  static login: Function =
    (formData: LoginPayload) => async (dispatch: AppDispatch) => {
      dispatch(authActions.loginLoading());
      try {
        const response = await customAxios.post("/users/auth", formData);

        const data = response.data;

        if (typeof data === "string") {
          dispatch(authActions.loginFailure(data));
        } else {
          dispatch(authActions.loginSuccess(data));
          saveToken(data.token);
        }
      } catch (err) {
        dispatch(authActions.loginFailure(err));
      }
    };

  static register: Function =
    (formData: RegisterPayload) => async (dispatch: AppDispatch) => {
      dispatch(authActions.registerLoading());

      try {
        const response = await customAxios.post("/users/reg", {
          email: formData.email,
          username: formData.name,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        });

        const data = response.data;

        if (typeof data === "string") {
          dispatch(authActions.registerFailure(data));
        } else {
          dispatch(authActions.registerSuccess());
        }
      } catch (err) {
        dispatch(authActions.registerFailure(err));
      }
    };

  static loginByToken: Function =
    (token: string) => async (dispatch: AppDispatch) => {
      dispatch(authActions.loginLoading());
      try {
        const response = await customAxios.post("/users/auth_token", { token });

        const data = response.data;

        if (typeof data === "string") {
          deleteToken();
          dispatch(authActions.loginFailure());
        } else {
          dispatch(authActions.loginSuccess(data));
        }
      } catch (err) {
        deleteToken();
        dispatch(authActions.loginFailure());
      }
    };
}
