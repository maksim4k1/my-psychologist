import {
  type SendHrSurveyApiRequestData,
  type SendHrSurveyRequestData,
} from "@/shared/types";

export const mapSendHrSurveyRequest = (
  data: SendHrSurveyRequestData,
): SendHrSurveyApiRequestData => {
  const { username, company } = data;

  return {
    username,
    description: "",
    city: "",
    company,
    online: false,
    gender: "1",
    birth_date: "2000-01-01",
  };
};

export const mapSendHrSurveyResponse = () => {};
