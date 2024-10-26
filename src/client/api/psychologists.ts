import { psychologistsActions } from "@/client/redux/features/psychologists";
import { type PsychologistData } from "@/client/redux/features/psychologists/types";
import { type AppDispatch } from "@/client/redux/store";
import { instanceofHttpError } from "@/client/utils/apiUtils";
import { customAxios } from "@/shared/config/api.config";

interface PsychologistDataResponse {
  id: string;
  username: string;
  online: boolean;
  company: string;
  face_to_face: false;
  gender: string;
  email: string;
  birth_date: string;
  description: string;
  role_id: number;
}

export default class PsychologistsService {
  static getMyPsychologists = () => async (dispatch: AppDispatch) => {
    dispatch(psychologistsActions.getMyPsychologistsLoading());

    try {
      const response = await customAxios.get<PsychologistDataResponse[]>(
        "/client/get_your_psychologist",
      );

      const data = response.data;

      const formattedData: PsychologistData[] = data.map((el) => ({
        userId: el.id,
        username: el.username,
        profileImage: "",
        isOnline: el.online,
      }));

      dispatch(psychologistsActions.getMyPsychologistsSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(psychologistsActions.getMyPsychologistsFailure(err));
      }
    }
  };

  static getPsychologists = () => async (dispatch: AppDispatch) => {
    dispatch(psychologistsActions.getPsychologistsLoading());

    try {
      const response = await customAxios.get<PsychologistDataResponse[]>(
        "/manager/get_all_manager",
      );

      const data = response.data;

      const formattedData: PsychologistData[] = data.map((el) => ({
        userId: el.id,
        username: el.username,
        profileImage: "",
        isOnline: el.online,
      }));

      dispatch(psychologistsActions.getPsychologistsSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(psychologistsActions.getPsychologistsFailure(err));
      }
    }
  };
}
