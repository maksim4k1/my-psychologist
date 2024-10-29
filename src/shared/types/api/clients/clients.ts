export type GetClientsResponseData = {
  userId: string;
  username: string;
  isOnline: boolean;
  problems: string[];
  profileImage: string;
}[];

export type GetClientsApiResponseData = {
  client_id: string;
  username: string;
  is_active: boolean;
  request: string[];
}[];
