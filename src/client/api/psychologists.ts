import { type AppDispatch, psychologistsActions } from "@/client/redux";
import { localAxios } from "@/shared/config/api.config";
import {
  type GetPsychologistsResponseData,
  ResponseError,
} from "@/shared/types";

export class PsychologistsService {
  static getMyPsychologists = () => async (dispatch: AppDispatch) => {
    dispatch(psychologistsActions.getMyPsychologistsLoading());

    try {
      const { data } =
        await localAxios.get<GetPsychologistsResponseData>("/psychologists/my");

      dispatch(psychologistsActions.getMyPsychologistsSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(
          psychologistsActions.getMyPsychologistsFailure(err.serialize()),
        );
      }
    }
  };

  static getPsychologists = () => async (dispatch: AppDispatch) => {
    dispatch(psychologistsActions.getPsychologistsLoading());

    try {
      const { data } =
        await localAxios.get<GetPsychologistsResponseData>("/psychologists");

      dispatch(psychologistsActions.getPsychologistsSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(psychologistsActions.getPsychologistsFailure(err.serialize()));
      }
    }
  };
}
