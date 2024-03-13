import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: string;
  className?: string;
  [key: string]: any;
}

const FormSubtitle: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h5
      className={`${styles.title} ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
};

export default FormSubtitle;
