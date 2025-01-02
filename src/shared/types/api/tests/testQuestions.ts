type TestQuestionAnswersApiData = {
  id: string;
  text: string;
  score: number;
}[];

export type GetTestQuestionsApiResponseData = {
  title: string;
  description: string;
  short_desc: string;
  questions: {
    number: number;
    text: string;
    answer_options: TestQuestionAnswersApiData;
  }[];
};

type TestQuestionAnswersData = {
  id: string;
  text: string;
  score: number;
}[];

type TestQuestionsData = {
  number: number;
  title: string;
  answers: TestQuestionAnswersData;
}[];

export interface GetTestQuestionsResponseData {
  id: string;
  title: string;
  questions: TestQuestionsData;
}
