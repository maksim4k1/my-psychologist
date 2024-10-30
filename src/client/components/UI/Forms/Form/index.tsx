import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Form: FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <form
      noValidate
      className={className}
      {...props}
    >
      {children}
    </form>
  );
};
