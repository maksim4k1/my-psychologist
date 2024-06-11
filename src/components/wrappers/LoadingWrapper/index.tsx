import LoadingLoop from "@/components/statusLabels/LoadingLoop";
import { FunctionComponent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  status: boolean | boolean[];
}

const LoadingWrapper: FunctionComponent<Props> = ({ children, status }) => {
  let isLoading: boolean;

  if (Array.isArray(status)) {
    isLoading = status.reduce((acc, el) => acc || el, false);
  } else {
    isLoading = status;
  }

  return isLoading ? <LoadingLoop /> : children;
};

export default LoadingWrapper;
