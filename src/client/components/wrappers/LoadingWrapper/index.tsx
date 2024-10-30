import { LoadingLoop } from "@/client/components";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  status: boolean | boolean[];
}

export const LoadingWrapper: FC<Props> = ({ children, status }) => {
  if (!Array.isArray(status)) status = [status];

  const isLoading: boolean = status.reduce((acc, el) => acc || el, false);

  return isLoading ? <LoadingLoop /> : children;
};
