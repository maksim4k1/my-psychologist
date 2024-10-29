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
