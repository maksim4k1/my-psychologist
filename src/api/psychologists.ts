import { customAxios } from "@/config/api.config";
import { psychologistsActions } from "@/redux/features/psychologists";
import { PsychologistData } from "@/redux/features/psychologists/types";
import { AppDispatch } from "@/redux/store";
import { instanceofHttpError } from "@/utils/apiUtils";

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
