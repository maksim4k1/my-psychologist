import axios from "axios";

export interface HttpError {
  status: number;
  message: string;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error): Promise<HttpError> => {
    const httpError: HttpError = {
      status: 500,
      message: "",
    };

    if (error?.response?.data?.detail) {
      if (typeof error.response.data.detail === "string") {
        httpError.message = error.response.data.detail;
      } else {
        httpError.message = error.response.data.detail[0].msg;
      }
    } else if (error instanceof Error) {
      httpError.message = error.message;
    } else {
      httpError.message = String(error);
    }

    if (error?.response?.status) {
      httpError.status = error.response.status;
    }

    return Promise.reject(httpError);
  },
);
