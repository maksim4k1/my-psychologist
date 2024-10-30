import { NextResponse } from "next/server";
import { mapGetTestQuestionsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestApiResponseData,
  type GetTestQuestionsApiResponseData,
  type GetTestQuestionsResponseData,
} from "@/shared/types";

const getTestQuestions = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const testPromise = serverFetch.get<GetTestApiResponseData>(
      `/test/get_test_info/${id}`,
    );

    const testQuestionsPromise =
      serverFetch.get<GetTestQuestionsApiResponseData>(
        `/test/get_test_questions/${id}`,
      );

    const [testResponse, testQuestionsResponse] = await Promise.all([
      testPromise,
      testQuestionsPromise,
    ]);

    const data: GetTestQuestionsResponseData = mapGetTestQuestionsResponse(
      testResponse.data,
      testQuestionsResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const TestQuestionsRoutes = {
  GET: getTestQuestions,
};
