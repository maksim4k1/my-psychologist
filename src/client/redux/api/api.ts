import { BFF_API_URL } from "@/shared/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [
    "Auth",
    "Applications",
    "Clients",
    "TestResults",
    "Feedbacks",
    "Articles",
  ],
  baseQuery: fetchBaseQuery({ baseUrl: BFF_API_URL }),
  endpoints: () => ({}),
});
