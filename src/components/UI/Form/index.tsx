import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

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
      className={`${styles.form} ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
