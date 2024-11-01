export type GetApplicationsResponseData = {
  id: string;
  userId: string;
  username: string;
  isOnline: boolean;
  problem: string;
  profileImage: string;
}[];

export type GetApplicationsApiResponseData = {
  app_id: string;
  client_id: string;
  username: string;
  text: string;
  online: true;
  problem_id: string;
  problem: string;
}[];

export interface SendApplicationRequestData {
  psychologistId: string;
  request: string;
  username: string;
}

export interface SendApplicationApiRequestData {
  user_id: string;
  text: string;
}
