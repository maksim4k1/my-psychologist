import { NextResponse } from "next/server";
import { mapGetTestResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestApiResponseData,
  type GetTestResponseData,
} from "@/shared/types";

const getTest = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetTestApiResponseData>(
      `/test/get_test_info/${id}`,
    );

    const data: GetTestResponseData = mapGetTestResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const TestRoutes = {
  GET: getTest,
};
