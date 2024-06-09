import { RootState } from "@/redux/store";
import { ClientData, ClientsState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectClientsModule = (state: RootState): ClientsState => {
  return state.clientsReducer;
};

export const selectClients = (state: RootState): ClientData[] => {
  return selectClientsModule(state).clients;
};

export const selectClientsState = (state: RootState): StatusState => {
  return selectClientsModule(state).getClientsState;
};
