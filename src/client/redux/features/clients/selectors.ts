import {
  type ClientData,
  type ClientProfileData,
  type ClientsState,
} from "./types";
import { type RootState } from "@/client/redux/store";
import { type StatusState } from "@/client/utils";

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
