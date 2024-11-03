import { api } from "../../api";
import { type GetPsychologistsResponseData } from "@/shared/types";

export const psychologistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPsychologists: builder.query<GetPsychologistsResponseData, void>({
      query: () => "/psychologists",
      providesTags: ["Auth"],
    }),
    getMyPsychologists: builder.query<GetPsychologistsResponseData, void>({
      query: () => "/psychologists/my",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetPsychologistsQuery, useGetMyPsychologistsQuery } =
  psychologistsApi;
