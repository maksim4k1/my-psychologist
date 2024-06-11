import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorText = "";
    if (error?.response?.data?.detail) {
      errorText = error?.response?.data?.detail;
    } else if (error instanceof Error) {
      errorText = error.message;
    } else {
      errorText = String(error);
    }
    return Promise.reject(errorText);
  },
);
