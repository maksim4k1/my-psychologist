import { LoginPayload, RegisterPayload } from "@/redux/features/auth/types";
import { AppDispatch } from "./../redux/store";
import { authActions } from "@/redux/features/auth/";

export const login: Function =
  (formData: LoginPayload) => async (dispatch: AppDispatch) => {
    dispatch(authActions.loginLoading());
    try {
      console.log(formData);

      dispatch(authActions.loginSuccess());
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
      console.log(formData);

      dispatch(authActions.registerSuccess());
    } catch (err) {
      dispatch(
        authActions.registerError(
          err instanceof Error ? err.message : String(err),
        ),
      );
    }
  };
