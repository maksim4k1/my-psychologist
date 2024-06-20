import { ReadonlyURLSearchParams } from "next/navigation";

export interface QueryParams {
  [key: string]: any;
}

export const addQueryParams: Function = (
  url: string,
  obj: QueryParams | undefined,
): string => {
  if (!obj) return "";

  const params: string[] = [];

  for (let key in obj) {
    params.push(`${key}=${String(obj[key])}`);
  }

  const result: string = "?" + params.join("&");

  return url + result;
};

export const mapSearchParamsToObject = (
  map: ReadonlyURLSearchParams,
): { [key: string]: any } => {
  return Object.fromEntries(map.entries());
};
