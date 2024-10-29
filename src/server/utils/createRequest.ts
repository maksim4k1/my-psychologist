import { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { mapErrorResponse } from "@/server/mappers/errors.mapper";
import { serverAxios } from "@/shared/config/api.config";
import { type ResponseError } from "@/shared/types";

type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";

// type HttpMethodWithBody = "post" | "put" | "patch";

type Cfg<D> = AxiosRequestConfig<D>;
type Res<T> = Promise<AxiosResponse<T>>;

interface ServerFetch {
  get: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
  delete: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
  head: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
  options: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
  post: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
  put: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
  patch: <T = any, D = any>(url: string, data?: D, config?: Cfg<D>) => Res<T>;
}

type RequestResolveCallback = (
  request: NextRequest,
  serverFetch: ServerFetch,
) => Promise<NextResponse>;

type RequestRejectCallback = (
  response: NextResponse,
  error: ResponseError,
) => NextResponse;

type CreatedRequest = (request: NextRequest) => Promise<NextResponse>;

const createServerFetch = (request: NextRequest): ServerFetch => {
  const createServerFetchMethod =
    (method: Method) =>
    async <T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ) => {
      const newConfig: AxiosRequestConfig<D> = {
        ...config,
        url,
        data,
        method,
        headers: {
          ...config?.headers,
          "Cookie": request.cookies.toString(),
        },
      };

      return await serverAxios.request<T, AxiosResponse<T>, D>(newConfig);
    };

  return {
    get: createServerFetchMethod("get"),
    delete: createServerFetchMethod("delete"),
    head: createServerFetchMethod("head"),
    options: createServerFetchMethod("options"),
    post: createServerFetchMethod("post"),
    put: createServerFetchMethod("put"),
    patch: createServerFetchMethod("patch"),
  };
};

export const createRequest = (
  resolve: RequestResolveCallback,
  reject?: RequestRejectCallback,
): CreatedRequest => {
  return async (request: NextRequest) => {
    try {
      const serverFetch = createServerFetch(request);

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
