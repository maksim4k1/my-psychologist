import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type FC } from "react";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const DefaultError: FC<Props> = ({ error }) => {
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

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errorMessage}</div>
        </div>
      );
    }
  }

  return <div>Непредвиденная ошибка :(</div>;
};
