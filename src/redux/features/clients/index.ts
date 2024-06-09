import { Actions } from "@/redux/store";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientsState } from "./types";

const initialState: ClientsState = {
  clients: [],
  getClientsState: createDefaultState(),
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClientsLoading: (state) => {
      state.getClientsState = createLoadingState();
    },
    getClientsSuccess: (state, { payload }) => {
      console.log(payload);
      state.getClientsState = createSuccessState();
      state.clients = payload;
    },
    getClientsError: (state, { payload }: PayloadAction<string>) => {
      state.getClientsState = createFailureState(payload);
    },
  },
});

export const clientsActions: Actions = clientsSlice.actions;

export default clientsSlice.reducer;
