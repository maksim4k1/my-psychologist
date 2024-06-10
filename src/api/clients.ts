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

interface ClientProfileResponse {
  username: string;
  birth_date: string;
  gender: string;
  request: string[];
}

export default class ClientsService {
  static getClients: Function = () => async (dispatch: AppDispatch) => {
    dispatch(clientsActions.getClientsLoading());

    try {
      const response = await customAxios.get("/psychologist/get_list_client");

      const data = response.data;

      if (typeof data === "string") {
        dispatch(clientsActions.getClientsError(data));
      } else {
        const formattedData: ClientData[] = data.map((el: ClientResponse) => ({
          userId: el.client_id,
          profileImage: "",
          username: el.username,
          isOnline: el.is_active,
          problems: el.request,
        }));
        dispatch(clientsActions.getClientsSuccess(formattedData));
      }
    } catch (err) {
      dispatch(
        clientsActions.getClientsError(
          err instanceof Error ? err.message : String(err),
        ),
      );
    }
  };

  static getClient: Function =
    (userId: string) => async (dispatch: AppDispatch) => {
      dispatch(clientsActions.getClientLoading());

      try {
        const response = await customAxios.post("/psychologist/get_client", {
          user_id: userId,
        });

        const data: ClientProfileResponse = response.data;

        if (typeof data === "string") {
          dispatch(clientsActions.getClientError(data));
        } else {
          const formattedData: ClientProfileData = {
            username: data.username,
            profileImage: "",
            isOnline: false,
            age: calculateAge(data.birth_date),
            problems: data.request,
          };
          dispatch(clientsActions.getClientSuccess(formattedData));
        }
      } catch (err) {
        dispatch(
          clientsActions.getClientError(
            err instanceof Error ? err.message : String(err),
          ),
        );
      }
    };
}
