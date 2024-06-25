import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientData, ClientProfileData, ClientsState } from "./types";
import { HttpError } from "../../../../config/api.config";

const initialState: ClientsState = {
  client: null,
  clients: [],
  getClientsState: createDefaultState(),
  getClientState: createDefaultState(),
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClientsLoading: (state) => {
      state.getClientsState = createLoadingState();
    },
    getClientsSuccess: (state, { payload }: PayloadAction<ClientData[]>) => {
      state.getClientsState = createSuccessState();
      state.clients = payload;
    },
    getClientsError: (state, { payload }: PayloadAction<HttpError>) => {
      state.getClientsState = createFailureState(payload);
    },
    getClientLoading: (state) => {
      state.getClientState = createLoadingState();
    },
    getClientSuccess: (
      state,
      { payload }: PayloadAction<ClientProfileData>,
    ) => {
      state.getClientState = createSuccessState();
      state.client = payload;
    },
    getClientError: (state, { payload }: PayloadAction<HttpError>) => {
      state.getClientState = createFailureState(payload);
    },
  },
});

export const clientsActions = clientsSlice.actions;

export default clientsSlice.reducer;
