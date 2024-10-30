import { psychologistsActions } from "@/client/redux/features/psychologists";
import { type AppDispatch } from "@/client/redux/store";
import { localAxios } from "@/shared/config/api.config";
import {
  type GetPsychologistsResponseData,
  ResponseError,
} from "@/shared/types";
import { instanceofHttpError } from "@/shared/utils";

export class PsychologistsService {
  static getMyPsychologists = () => async (dispatch: AppDispatch) => {
    dispatch(psychologistsActions.getMyPsychologistsLoading());

    try {
      const { data } =
        await localAxios.get<GetPsychologistsResponseData>("/psychologists/my");

      dispatch(psychologistsActions.getMyPsychologistsSuccess(data));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(psychologistsActions.getMyPsychologistsFailure(err));
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
