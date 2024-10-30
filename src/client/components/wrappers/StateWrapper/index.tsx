import { HttpErrorWrapper } from "../HttpErrorWrapper";
import { LoadingWrapper } from "../LoadingWrapper";
import { type StatusState } from "@/client/utils";
import { type HttpError } from "@/shared/config/api.config";
import { type FC, type ReactNode } from "react";

interface Props {
  state: StatusState[] | StatusState;
  children: ReactNode;
}

export const StateWrapper: FC<Props> = ({ state, children }) => {
  if (!Array.isArray(state)) state = [state];

  const isLoadingStatus: boolean[] = state.map((el) => el.isLoading);
  const isFailureStatus: boolean[] = state.map((el) => el.isFailure);
  const errors: Array<HttpError | null> = state.map((el) => el.error);

  return (
    <LoadingWrapper status={isLoadingStatus}>
      <HttpErrorWrapper
        status={isFailureStatus}
        error={errors}
      >
        {children}
      </HttpErrorWrapper>
    </LoadingWrapper>
  );
};
