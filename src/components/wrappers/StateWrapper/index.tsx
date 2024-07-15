import { StatusState } from "@/utils/stateCreators";
import { FunctionComponent, ReactNode } from "react";
import { HttpError } from "../../../config/api.config";
import LoadingWrapper from "../LoadingWrapper";
import HttpErrorWrapper from "../HttpErrorWrapper";

interface Props {
  state: StatusState[] | StatusState;
  children: ReactNode;
}

const StateWrapper: FunctionComponent<Props> = ({ state, children }) => {
  if (!Array.isArray(state)) state = [state];

  let isLoadingStatus: boolean[] = state.map((el) => el.isLoading);
  let isFailureStatus: boolean[] = state.map((el) => el.isFailure);
  let errors: Array<HttpError | null> = state.map((el) => el.error);

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

export default StateWrapper;
