import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const Container: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
