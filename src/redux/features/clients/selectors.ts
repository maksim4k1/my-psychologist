import { RootState } from "@/redux/store";
import { ClientData, ClientProfileData, ClientsState } from "./types";
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

export const selectClientState = (state: RootState): StatusState => {
  return selectClientsModule(state).getClientState;
};

export const selectClient = (state: RootState): ClientProfileData | null => {
  return selectClientsModule(state).client;
};
