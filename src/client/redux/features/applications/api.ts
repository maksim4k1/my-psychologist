import { api } from "../../api";
import {
  type ConfirmApplicationRequestData,
  type GetApplicationResponseData,
  type GetApplicationsResponseData,
  type ResponseSuccessInfo,
  type SendApplicationRequestData,
} from "@/shared/types";

export const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<GetApplicationsResponseData, void>({
      query: () => "/applications",
      providesTags: ["Auth", "Applications"],
    }),

    getApplication: builder.query<GetApplicationResponseData, string>({
      query: (id) => `/applications/${id}`,
      providesTags: ["Auth"],
    }),

    sendApplication: builder.mutation<
      ResponseSuccessInfo,
      SendApplicationRequestData
    >({
      query: (body) => ({
        url: "/applications",
        method: "POST",
        body,
      }),
    }),

    confirmApplication: builder.mutation<
      ResponseSuccessInfo,
      ConfirmApplicationRequestData
    >({
      query: (body) => ({
        url: "/applications/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applications", "Clients"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useSendApplicationMutation,
  useConfirmApplicationMutation,
} = applicationsApi;
