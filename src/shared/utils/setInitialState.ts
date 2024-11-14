import {
  cookies as cookiesData,
  initialState as globalInitialState,
} from "@/shared/data";
import {
  type AuthState,
  type InitialState,
  type LoginResponseData,
} from "@/shared/types";

export const getInitialState = (cookieStore: any): InitialState => {
  const userDataJSON = cookieStore.get(cookiesData.userData.name)?.value;
  const userData: LoginResponseData | null = userDataJSON
    ? JSON.parse(decodeURIComponent(userDataJSON))
    : null;

  const authReducer: AuthState | null = userData
    ? {
        isAuth: true,
        profile: {
          id: userData.userId,
          email: userData.email,
          username: userData.username,
          role: userData.role,
        },
      }
    : null;

  const initialState: InitialState = authReducer
    ? {
        ...globalInitialState,
        authReducer,
      }
    : globalInitialState;

  return initialState;
};
