import { LoginPayload, RegisterPayload } from "@/redux/features/auth/types";
import { AppDispatch } from "./../redux/store";
import { authActions } from "@/redux/features/auth/";
import { API } from "../../config/api.config";
import { deleteToken, saveToken } from "@/storage/token";

export const login: Function =
  (formData: LoginPayload) => async (dispatch: AppDispatch) => {
    dispatch(authActions.loginLoading());
    try {
      const response = await fetch(`${API}/users/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (typeof data === "string") {
        dispatch(authActions.loginError(data));
      } else {
        dispatch(authActions.loginSuccess(data));
        saveToken(data.token);
      }
    } catch (err) {
      dispatch(
        authActions.loginError(
          err instanceof Error ? err.message : String(err),
        ),
      );
    }
  };

export const register: Function =
  (formData: RegisterPayload) => async (dispatch: AppDispatch) => {
    dispatch(authActions.registerLoading());

    try {
      const response = await fetch(`${API}/users/reg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.name,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (typeof data === "string") {
        dispatch(authActions.registerError(data));
      } else {
        dispatch(authActions.registerSuccess(data));
      }
    } catch (err) {
      dispatch(
        authActions.registerError(
          err instanceof Error ? err.message : String(err),
        ),
      );
    }
  };

export const loginByToken: Function =
  (token: string) => async (dispatch: AppDispatch) => {
    dispatch(authActions.loginLoading());
    try {
      const response = await fetch(`${API}/users/auth_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      const data = await response.json();

      if (typeof data === "string") {
        deleteToken();
        dispatch(authActions.loginError());
      } else {
        dispatch(authActions.loginSuccess(data));
      }
    } catch (err) {
      deleteToken();
      dispatch(authActions.loginError());
    }
  };
