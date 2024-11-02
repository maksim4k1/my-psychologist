import { type AppDispatch, authActions } from "@/client/redux";
import { localAxios } from "@/shared/config/api.config";
import { ResponseError, type SendHrSurveyRequestData } from "@/shared/types";

export class AuthService {
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
