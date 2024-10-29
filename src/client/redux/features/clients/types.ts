import { type StatusState } from "@/client/utils";
import { GetClientsResponseData } from "@/shared/types";

export interface ClientProfileData {
  userId: string;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
  age: number;
  problem?: never;
}

export interface ClientsState {
  clients: GetClientsResponseData;
  client: ClientProfileData | null;
  getClientsState: StatusState;
  getClientState: StatusState;
}
