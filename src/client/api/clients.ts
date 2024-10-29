import { clientsActions } from "@/client/redux/features/clients";
import { type AppDispatch } from "@/client/redux/store";
import { localAxios } from "@/shared/config/api.config";
import {
  type GetClientResponseData,
  type GetClientsResponseData,
  ResponseError,
} from "@/shared/types";

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
      const { data } = await localAxios.get<GetClientResponseData>(
        `/clients/${userId}`,
      );

      dispatch(clientsActions.getClientSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(clientsActions.getClientFailure(err.serialize()));
      }
    }
  };
}
