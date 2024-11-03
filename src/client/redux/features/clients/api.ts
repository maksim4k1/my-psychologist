import { api } from "../../api";
import {
  type GetClientResponseData,
  type GetClientsResponseData,
} from "@/shared/types";

export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<GetClientsResponseData, void>({
      query: () => "/clients",
      providesTags: ["Auth", "Clients"],
    }),

    getClient: builder.query<GetClientResponseData, string>({
      query: (id) => `/clients/${id}`,
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetClientsQuery, useGetClientQuery } = clientsApi;
