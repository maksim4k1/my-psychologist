import { applicationsActions } from "@/redux/features/applications";
import { AppDispatch } from "@/redux/store";
import { HttpError, customAxios } from "../config/api.config";
import {
  ApplicationData,
  ApplicationProfileData,
} from "@/redux/features/applications/types";
import { calculateAge } from "@/utils/dataUtils";
import { getRoleId, instanceofHttpError } from "@/utils/apiUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccessRole } from "@/config/access.config";

interface ApplicationResponse {
  app_id: string;
  client_id: string;
  online: boolean;
  problem: null | string;
  problem_id: null | string;
  text: string;
  username: string;
}

export default class ApplicationsService {
  static getApplications = () => async (dispatch: AppDispatch) => {
    dispatch(applicationsActions.getApplicationsLoading());

    try {
      const response = await customAxios.get(
        "/application/get_list_applications",
      );

      const data = response.data;

      const formattedData: ApplicationData[] = data.map(
        (el: ApplicationResponse) => ({
          id: el.app_id,
          userId: el.client_id,
          profileImage: "",
          username: el.username,
          isOnline: el.online,
          problem: el.text,
        }),
      );

      dispatch(applicationsActions.getApplicationsSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(applicationsActions.getApplicationsFailure(err));
      }
    }
  };

  static getApplication =
    (applicationId: string) => async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.getApplicationLoading());

      try {
        const response = await customAxios.get(
          `/application/watch_application/${applicationId}`,
        );

        const data = response.data;

        const formattedData: ApplicationProfileData = {
          id: data.app_id,
          userId: data.client_id,
          profileImage: "",
          age: calculateAge(data.birth_date),
          username: data.username,
          isOnline: data.online,
          problem: data.text,
        };

        dispatch(applicationsActions.getApplicationSuccess(formattedData));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(applicationsActions.getApplicationFailure(err));
        }
      }
    };

  static confirmApplication =
    (userId: string, status: boolean) => async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.confirmApplicationLoading());

      try {
        const response = await customAxios.post(
          "/psychologist/confirm_application",
          {
            user_id: userId,
            status,
          },
        );

        dispatch(applicationsActions.confirmApplicationSuccess(response.data));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(applicationsActions.confirmApplicationFailure(err));
        }
      }
    };

  static sendApplication =
    (
      psychologistId: string,
      role: AccessRole,
      fullName: string,
      request: string,
    ) =>
    async (dispatch: AppDispatch) => {
      dispatch(applicationsActions.sendApplicationLoading());

      try {
        const sendApplicationResponse = customAxios.post(
          "/client/send_application",
          {
            user_id: psychologistId,
            text: request,
          },
        );

        const editFullNameResponse = customAxios.post("/users/update_user", {
          birth_date: "2000-01-01",
          gender: "1",
          username: fullName,
          request: [1],
          city: "",
          description: "",
          type: getRoleId(role),
        });

        await Promise.all([sendApplicationResponse, editFullNameResponse]);

        dispatch(applicationsActions.sendApplicationSuccess());
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(applicationsActions.sendApplicationFailure(err));
        }
      }
    };
}
