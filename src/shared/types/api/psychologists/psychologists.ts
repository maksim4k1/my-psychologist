export type GetPsychologistsResponseData = {
  userId: string;
  username: string;
  profileImage: string;
  isOnline: boolean;
}[];

export type GetPsychologistsApiResponseData = {
  id: string;
  username: string;
  online: boolean;
  company: string;
  face_to_face: false;
  gender: string;
  email: string;
  birth_date: string;
  description: string;
  role_id: number;
}[];
