import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const Form: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
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

export default Form;
