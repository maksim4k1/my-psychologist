import { StatusState } from "@/utils/stateCreators";

export interface ClientData {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

export interface ClientsState {
  clients: ClientData[];
  getClientsState: StatusState;
}
