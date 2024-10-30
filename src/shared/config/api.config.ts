import { ResponseError } from "../types";
import axios, { type AxiosError } from "axios";

export interface HttpError {
  status: number;
  message: string;
}

export const SEVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
export const BFF_API_URL = process.env.NEXT_PUBLIC_BFF_API_URL;

export const localAxios = axios.create({
  baseURL: BFF_API_URL,
  withCredentials: true,
});

export const serverAxios = axios.create({
  baseURL: SEVER_API_URL,
  withCredentials: true,
});

const onRejectedInterceptor = (
  error: AxiosError<ResponseError>,
): Promise<ResponseError> => {
  const response = error.response;

  if (response) {
    const { status, message } = response.data;

    return Promise.reject(new ResponseError(status, message));
  }

  return Promise.reject(error);
};

localAxios.interceptors.response.use(undefined, onRejectedInterceptor);
