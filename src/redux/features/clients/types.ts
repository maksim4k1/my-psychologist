import { type StatusState } from "@/utils/stateCreators";

export interface ClientData {
  userId: string;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

export interface ClientProfileData extends ClientData {
  age: number;
  problem?: never;
}

export interface ClientsState {
  clients: ClientData[];
  client: ClientProfileData | null;
  getClientsState: StatusState;
  getClientState: StatusState;
}
