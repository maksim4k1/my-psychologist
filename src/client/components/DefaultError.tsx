import { getQueryErrorMessage } from "../utils";
import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type FC } from "react";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const DefaultError: FC<Props> = ({ error }) => {
  const errorMessage = getQueryErrorMessage(error);

  return <div>{errorMessage}</div>;
};
