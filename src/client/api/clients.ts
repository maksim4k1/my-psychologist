import {
  type ClientData,
  type ClientProfileData,
} from "./../redux/features/clients/types";
import { clientsActions } from "@/client/redux/features/clients";
import { type AppDispatch } from "@/client/redux/store";
import { calculateAge } from "@/client/utils";
import { customAxios } from "@/shared/config/api.config";
import { instanceofHttpError } from "@/shared/utils/api";

interface ClientResponse {
  client_id: string;
  username: string;
  is_active: boolean;
  request: string[];
}

interface ClientProfileResponse extends ClientResponse {
  gender: string;
  birth_date: string;
}

export class ClientsService {
  static getClients = () => async (dispatch: AppDispatch) => {
    dispatch(clientsActions.getClientsLoading());

    try {
      const response = await customAxios.get<ClientResponse[]>(
        "/psychologist/get_list_client",
      );

      const data = response.data;

      const formattedData: ClientData[] = data.map((el) => ({
        userId: el.client_id,
        profileImage: "",
        username: el.username,
        isOnline: el.is_active,
        problems: el.request,
      }));
      dispatch(clientsActions.getClientsSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(clientsActions.getClientsFailure(err));
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
