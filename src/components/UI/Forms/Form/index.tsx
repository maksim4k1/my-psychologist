import { FunctionComponent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  className?: string;
  [key: string]: any;
}

const Form: FunctionComponent<Props> = ({
  children,
  title,
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
