import { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { mapErrorResponse } from "@/server/mappers/errors.mapper";
import { serverAxios } from "@/shared/config/api.config";
import { type ResponseError } from "@/shared/types";

type HttpMethod =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

type ServerFetch<T, D> = (
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => Promise<AxiosResponse<T>>;

type RequestResolveCallback<T, D> = (
  request: NextRequest,
  serverFetch: ServerFetch<T, D>,
) => Promise<NextResponse>;

type RequestRejectCallback = (
  response: NextResponse,
  error: ResponseError,
) => NextResponse;

type CreatedRequest = (request: NextRequest) => Promise<NextResponse>;

const createServerFetch = <T, D>(
  method: HttpMethod,
  request: NextRequest,
): ServerFetch<T, D> => {
  if (
    method === "get" ||
    method === "delete" ||
    method === "head" ||
    method === "options"
  ) {
    return async (url, data, config) => {
      const newConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          "Cookie": request.cookies.toString(),
        },
        data,
      };

      return await serverAxios[method]<T, AxiosResponse<T>, D>(url, newConfig);
    };
  }

  return async (url, data, config) => {
    const newConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        "Cookie": request.cookies.toString(),
      },
    };

    return await serverAxios[method]<T, AxiosResponse<T>, D>(
      url,
      data,
      newConfig,
    );
  };
};

export const createRequest = <T = any, D = any>(
  method: HttpMethod,
  resolve: RequestResolveCallback<T, D>,
  reject?: RequestRejectCallback,
): CreatedRequest => {
  return async (request: NextRequest) => {
    try {
      const serverFetch: ServerFetch<T, D> = createServerFetch(method, request);

      const response = await resolve(request, serverFetch);

      return response;
    } catch (error) {
      const errorRespose = mapErrorResponse(error);

      let response: NextResponse = NextResponse.json(errorRespose.serialize(), {
        status: errorRespose.status,
      });

      if (reject) response = reject(response, errorRespose);

      return response;
    }
  };
};
