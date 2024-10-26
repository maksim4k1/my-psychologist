import {
  type ClientData,
  type ClientProfileData,
  type ClientsState,
} from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils/stateCreators";
import { type HttpError } from "@/shared/config/api.config";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    // get clients actions
    getClientsLoading: (state) => {
      state.getClientsState = createLoadingState();
    },
    getClientsSuccess: (state, { payload }: PayloadAction<ClientData[]>) => {
      state.getClientsState = createSuccessState();
      state.clients = payload;
    },
    getClientsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getClientsState = createFailureState(payload);
    },
    getClientsSetDefaultState: (state) => {
      state.getClientsState = createDefaultState();
      state.clients = initialState.clients;
    },

    // get client actions
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
    getClientFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getClientState = createFailureState(payload);
    },
    getClientSetDefaultState: (state) => {
      state.getClientState = createDefaultState();
      state.client = initialState.client;
    },
  },
});

export const clientsActions = clientsSlice.actions;

export default clientsSlice.reducer;
