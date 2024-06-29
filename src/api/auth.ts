import { LoginPayload, RegisterPayload } from "@/redux/features/auth/types";
import { AppDispatch } from "./../redux/store";
import { authActions } from "@/redux/features/auth/";
import { customAxios } from "../../config/api.config";
import { deleteToken, getToken } from "@/storage/token";
import { instanceofHttpError } from "@/utils/apiUtils";

export default class AuthService {
  static login: Function =
    (formData: LoginPayload) => async (dispatch: AppDispatch) => {
      dispatch(authActions.loginLoading());
      try {
        const response = await customAxios.post("/users/auth", formData);

        const data = response.data;

        dispatch(authActions.loginSuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(authActions.loginFailure(err));
        }
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

        dispatch(authActions.registerSuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(authActions.registerFailure(err));
        }
      }
    };

  static loginByToken: Function = () => async (dispatch: AppDispatch) => {
    const token = getToken();
    if (token) {
      dispatch(authActions.loginLoading());
      try {
        const response = await customAxios.post("/users/auth_token", {
          token: token,
        });

        const data = response.data;

        dispatch(authActions.loginSuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          deleteToken();
          dispatch(authActions.loginFailure(err));
        }
      }
    }
  };
}
