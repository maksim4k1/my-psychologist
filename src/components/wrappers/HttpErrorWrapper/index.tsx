import { type HttpError } from "../../../config/api.config";
import AccessDeniedError from "@/components/errors/AccessDeniedError";
import BadRequestError from "@/components/errors/BadRequestError";
import NotFoundError from "@/components/errors/NotFoundError";
import ServerError from "@/components/errors/ServerError";
import { type FunctionComponent, type ReactNode } from "react";

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

  for (let i = 0; i < status.length; i++) {
    const isFailure = status[i];
    const err = error[i];
    if (isFailure && err) {
      switch (err.status) {
        case 400: {
          return <BadRequestError message={err.message} />;
        }
        case 404: {
          return <NotFoundError message={err.message} />;
        }
        case 403: {
          return <AccessDeniedError />;
        }
        case 500: {
          return <ServerError />;
        }
        default: {
          if (status && error) {
            return (
              <ServerError
                status={err.status}
                message={err.message}
              />
            );
          } else {
            return <ServerError />;
          }
        }
      }
    }
  }

  return children;
};

export default HttpErrorWrapper;
