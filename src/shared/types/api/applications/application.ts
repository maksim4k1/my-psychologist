export type GetApplicationResponseData = {
  id: string;
  userId: string;
  username: string;
  age: number;
  isOnline: boolean;
  problem: string;
  profileImage: string;
};

export type GetApplicationApiResponseData = {
  app_id: string;
  client_id: string;
  username: string;
  text: string;
  is_active: true;
  birth_date: string;
  gender: string;
};
