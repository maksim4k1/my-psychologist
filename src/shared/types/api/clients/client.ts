export type GetClientResponseData = {
  userId: string;
  username: string;
  isOnline: boolean;
  problems: string[];
  age: number;
  profileImage: string;
};

export type GetClientApiResponseData = {
  client_id: string;
  username: string;
  birth_date: string;
  gender: string;
  is_active: boolean;
  request: string[];
};
