import NotFoundError from "@/components/errors/NotFoundError";
import { FunctionComponent, ReactNode } from "react";
import { HttpError } from "../../../../config/api.config";
import AccessDeniedError from "@/components/errors/AccessDeniedError";
import ServerError from "@/components/errors/ServerError";

interface Props {
  status: boolean[] | boolean;
  error: Array<HttpError | null> | HttpError | null;
  children: ReactNode;
}

const HttpErrorWrapper: FunctionComponent<Props> = ({
  status,
  error,
  children,
}) => {
  if (!Array.isArray(status)) status = [status];
  if (!Array.isArray(error)) error = [error];

  const isFailure = status.reduce((acc, el) => acc || el, false);

  if (isFailure) {
    for (let err of error) {
      if (err) {
        switch (err.status) {
          case 404: {
            return <NotFoundError message={err.message} />;
          }
          case 403: {
            return <AccessDeniedError />;
          }
          default: {
            return <ServerError />;
          }
        }
      }
    }
  }

  return children;
};

export default HttpErrorWrapper;
