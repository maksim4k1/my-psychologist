import axios from "axios";

export interface HttpError {
  status: number;
  message: string;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BFF_URL = "http://localhost:3000/api";

export const localAxios = axios.create({
  baseURL: BFF_URL,
  withCredentials: true,
});

export const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const onFulfilledInterceptor = (response: any) => {
  return response;
};

const onRejectedInterceptor = (error: any): Promise<HttpError> => {
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
  } else if (error?.response?.data?.message) {
    httpError.message = error.response.data.message;
  } else if (error instanceof Error) {
    httpError.message = error.message;
  } else {
    httpError.message = String(error);
  }

  if (error?.response?.status) {
    httpError.status = error.response.status;
  }

  return Promise.reject(httpError);
};

customAxios.interceptors.response.use(
  onFulfilledInterceptor,
  onRejectedInterceptor,
);

localAxios.interceptors.response.use(
  onFulfilledInterceptor,
  onRejectedInterceptor,
);
