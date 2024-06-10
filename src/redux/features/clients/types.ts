import { StatusState } from "@/utils/stateCreators";

export interface ClientProfileData {
  username: string;
  profileImage: string;
  isOnline: boolean;
  age: number;
  problems: string[];
}

export interface ClientData {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

export interface ClientsState {
  clients: ClientData[];
  client: ClientProfileData | null;
  getClientsState: StatusState;
  getClientState: StatusState;
}
