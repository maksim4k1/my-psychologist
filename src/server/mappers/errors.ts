import { AxiosError } from "axios";
import { httpStatuses } from "@/shared/data";
import {
  ResponseError,
  type ServerResponseError,
  type ServerResponseValidationError,
} from "@/shared/types";

const internalServerError: ResponseError = new ResponseError(
  httpStatuses.internalServerError.status,
  "Что-то пошло не так, попробуйте повторить позже",
);

const connectionError: ResponseError = new ResponseError(
  httpStatuses.internalServerError.status,
  "Не удалось установить соединение с сервером",
);

export const mapErrorResponse = (
  error:
    | unknown
    | AxiosError<ServerResponseValidationError | ServerResponseError>,
): ResponseError => {
  try {
    if (error instanceof AxiosError) {
      const response = error.response;

      if (response) {
        const { data, status } = response;
        const { detail } = data;

        if (!detail) {
          return internalServerError;
        } else if (typeof detail === "string") {
          return new ResponseError(status, detail);
        } else {
          return new ResponseError(status, detail[0].msg);
        }
      }

      return connectionError;
    } else return internalServerError;
  } catch {
    return connectionError;
  }
};
