import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const mapApiErrorMessage = (
  error?: FetchBaseQueryError | SerializedError,
) => {
  if (error) {
    if ("status" in error) {
      const errorMessage =
        "error" in error
          ? error.error
          : error?.data &&
              typeof error.data === "object" &&
              "message" in error.data &&
              typeof error.data.message === "string"
            ? error.data.message
            : JSON.stringify(error.data);

      return errorMessage;
    }
  }

  return "Непредвиденная ошибка :(";
};
