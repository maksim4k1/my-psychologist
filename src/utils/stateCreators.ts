export interface StatusState {
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  error: string;
}

export const createDefaultState = (): StatusState => {
  return {
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: "",
  };
};

export const createLoadingState = (): StatusState => {
  return {
    isSuccess: false,
    isLoading: true,
    isFailure: false,
    error: "",
  };
};

export const createSuccessState = (): StatusState => {
  return {
    isSuccess: true,
    isLoading: false,
    isFailure: false,
    error: "",
  };
};

export const createFailureState = (errorMessage: string): StatusState => {
  return {
    isSuccess: false,
    isLoading: false,
    isFailure: true,
    error: errorMessage,
  };
};
