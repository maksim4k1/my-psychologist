export interface SendHrSurveyRequestData {
  username: string;
  company: string;
}

export interface SendHrSurveyApiRequestData {
  username: string;
  description: string;
  city: string;
  company: string;
  online: boolean;
  gender: string;
  birth_date: string;
}
