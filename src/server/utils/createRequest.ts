import { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { mapErrorResponse } from "@/server/mappers";
import { serverAxios } from "@/shared/config/api";
import { type ResponseError } from "@/shared/types";

type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";

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

type RequestResolveCallback<P> = (
  request: NextRequest,
  serverFetch: ServerFetch,
  params: P,
) => Promise<NextResponse>;

type RequestRejectCallback = (
  response: NextResponse,
  error: ResponseError,
) => NextResponse;

interface SegmentData<P> {
  params: Promise<P>;
}
type CreatedRequest<P> = (
  request: NextRequest,
  params: SegmentData<P>,
) => Promise<NextResponse>;

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

export const createRequest = <P extends Record<string, string> = any>(
  resolve: RequestResolveCallback<P>,
  reject?: RequestRejectCallback,
): CreatedRequest<P> => {
  return async (request: NextRequest, segmentData: SegmentData<P>) => {
    try {
      const serverFetch = createServerFetch(request);

      const params = await segmentData.params;

      const response = await resolve(request, serverFetch, params);

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
