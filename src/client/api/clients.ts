import { type ClientProfileData } from "./../redux/features/clients/types";
import { clientsActions } from "@/client/redux/features/clients";
import { type AppDispatch } from "@/client/redux/store";
import { calculateAge } from "@/client/utils";
import { customAxios, localAxios } from "@/shared/config/api.config";
import { GetClientsResponseData, ResponseError } from "@/shared/types";
import { instanceofHttpError } from "@/shared/utils/api";

interface ClientProfileResponse {
  client_id: string;
  username: string;
  is_active: boolean;
  request: string[];
  gender: string;
  birth_date: string;
}

export class ClientsService {
  static getClients = () => async (dispatch: AppDispatch) => {
    dispatch(clientsActions.getClientsLoading());

    try {
      const { data } = await localAxios.get<GetClientsResponseData>("/clients");

      dispatch(clientsActions.getClientsSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(clientsActions.getClientsFailure(err.serialize()));
      }
    }
  };

  static getClient = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(clientsActions.getClientLoading());

    try {
      const response = await customAxios.get(
        `/psychologist/get_client/${userId}`,
      );

      const data: ClientProfileResponse = response.data;

      const formattedData: ClientProfileData = {
        userId: data.client_id,
        username: data.username,
        profileImage: "",
        isOnline: false,
        age: calculateAge(data.birth_date),
        problems: data.request,
      };
      dispatch(clientsActions.getClientSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(clientsActions.getClientFailure(err));
      }
    }
  };
}
