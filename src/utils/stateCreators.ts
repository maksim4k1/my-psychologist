import { HttpError } from "../config/api.config";

export interface StatusState {
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  error: HttpError | null;
}

export const createDefaultState = (): StatusState => {
  return {
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: null,
  };
};

export const createLoadingState = (): StatusState => {
  return {
    isSuccess: false,
    isLoading: true,
    isFailure: false,
    error: null,
  };
};

export const createSuccessState = (): StatusState => {
  return {
    isSuccess: true,
    isLoading: false,
    isFailure: false,
    error: null,
  };
};

export const createFailureState = (errorMessage: HttpError): StatusState => {
  return {
    isSuccess: false,
    isLoading: false,
    isFailure: true,
    error: errorMessage,
  };
};
