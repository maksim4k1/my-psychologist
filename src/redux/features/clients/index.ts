import { Actions } from "@/redux/store";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientData, ClientProfileData, ClientsState } from "./types";

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
      console.log(payload);
      state.getClientsState = createSuccessState();
      state.clients = payload;
    },
    getClientsError: (state, { payload }: PayloadAction<string>) => {
      state.getClientsState = createFailureState(payload);
    },
    getClientLoading: (state) => {
      state.getClientState = createLoadingState();
    },
    getClientSuccess: (
      state,
      { payload }: PayloadAction<ClientProfileData>,
    ) => {
      console.log(payload);
      state.getClientState = createSuccessState();
      state.client = payload;
    },
    getClientError: (state, { payload }: PayloadAction<string>) => {
      state.getClientState = createFailureState(payload);
    },
  },
});

export const clientsActions: Actions = clientsSlice.actions;

export default clientsSlice.reducer;
