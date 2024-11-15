import { loginByToken } from "@/server/utils";
import { initialState } from "@/shared/data";
import { type AuthState, type InitialState } from "@/shared/types";

export const getInitialState = async (
  accessToken?: string,
): Promise<InitialState> => {
  const loginResponse = await loginByToken(accessToken);

  if (loginResponse) {
    const { userData } = loginResponse;
    const authReducer: AuthState = {
      isAuth: true,
      profile: {
        id: userData.userId,
        email: userData.email,
        username: userData.username,
        role: userData.role,
      },
    };

    const newInitialState: InitialState = authReducer
      ? {
          ...initialState,
          authReducer,
        }
      : initialState;

    return newInitialState;
  }

  return initialState;
};
