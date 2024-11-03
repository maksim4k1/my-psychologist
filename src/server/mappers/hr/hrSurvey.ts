import {
  type GetUserApiResponseData,
  type SendHrSurveyApiRequestData,
  type SendHrSurveyRequestData,
} from "@/shared/types";

export const mapSendHrSurveyRequest = (
  userData: GetUserApiResponseData,
  hrSurveyData: SendHrSurveyRequestData,
): SendHrSurveyApiRequestData => {
  const { username, company } = hrSurveyData;
  const { description, city, gender, birth_date } = userData;

  return {
    username,
    description,
    city,
    company,
    online: false,
    gender,
    birth_date: new Date(birth_date).toJSON(),
  };
};

export const mapSendHrSurveyResponse = () => {};
