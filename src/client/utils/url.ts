export interface QueryParams {
  [key: string]: any;
}

export const addQueryParams = (
  url: string,
  obj: QueryParams | undefined,
): string => {
  if (!obj) return "";

  const params: string[] = [];

  for (const key in obj) {
    params.push(`${key}=${String(obj[key])}`);
  }

  const result: string = "?" + params.join("&");

  return url + result;
};
