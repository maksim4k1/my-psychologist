import LoadingLoop from "@/client/components/statusLabels/LoadingLoop";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  status: boolean | boolean[];
}

const LoadingWrapper: FunctionComponent<Props> = ({ children, status }) => {
  if (!Array.isArray(status)) status = [status];

  const isLoading: boolean = status.reduce((acc, el) => acc || el, false);

  return isLoading ? <LoadingLoop /> : children;
};

export default LoadingWrapper;
