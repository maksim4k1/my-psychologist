import { type StatusState } from "@/client/utils";
import {
  type GetClientResponseData,
  type GetClientsResponseData,
} from "@/shared/types";

export interface ClientsState {
  clients: GetClientsResponseData;
  client: GetClientResponseData | null;
  getClientsState: StatusState;
  getClientState: StatusState;
}
