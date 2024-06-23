import {
  ClientData,
  ClientProfileData,
} from "./../redux/features/clients/types";
import { customAxios } from "./../../config/api.config";
import { clientsActions } from "@/redux/features/clients";
import { AppDispatch } from "@/redux/store";
import { calculateAge } from "@/utils/dataUtils";

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

export default class ClientsService {
  static getClients: Function = () => async (dispatch: AppDispatch) => {
    dispatch(clientsActions.getClientsLoading());

    try {
      const response = await customAxios.get("/psychologist/get_list_client");

      const data = response.data;

      const formattedData: ClientData[] = data.map((el: ClientResponse) => ({
        userId: el.client_id,
        profileImage: "",
        username: el.username,
        isOnline: el.is_active,
        problems: el.request,
      }));
      dispatch(clientsActions.getClientsSuccess(formattedData));
    } catch (err) {
      dispatch(clientsActions.getClientsError(err));
    }
  };

  static getClient: Function =
    (userId: string) => async (dispatch: AppDispatch) => {
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
        dispatch(clientsActions.getClientError(err));
      }
    };
}
