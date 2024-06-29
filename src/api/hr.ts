import { hrActions } from "@/redux/features/hr";
import { SendHrSurveyPayload } from "@/redux/features/hr/types";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import { instanceofHttpError } from "@/utils/apiUtils";
import AuthService from "./auth";

export default class HrService {
  static sendHrSurvey: Function =
    (formData: SendHrSurveyPayload) => async (dispatch: AppDispatch) => {
      dispatch(hrActions.sendHrSurveyLoading());

      try {
        const response = await customAxios.post("/manager/send_manager", {
          username: formData.fullName,
          description: "",
          city: "",
          company: formData.company,
          online: false,
          gender: "1",
          birth_date: "2000-01-01",
        });

        const data = response.data;

        await dispatch(AuthService.loginByToken());
        dispatch(hrActions.sendHrSurveySuccess(data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(hrActions.sendHrSurveyFailure(err));
        }
      }
    };
}
