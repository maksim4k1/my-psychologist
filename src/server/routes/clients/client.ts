import { NextResponse } from "next/server";
import { mapGetClientResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  GetClientApiResponseData,
  GetClientResponseData,
} from "@/shared/types";

const getClient = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetClientApiResponseData>(
      `/psychologist/get_client/${id}`,
    );

    const data: GetClientResponseData = mapGetClientResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const ClientRoutes = {
  GET: getClient,
};
