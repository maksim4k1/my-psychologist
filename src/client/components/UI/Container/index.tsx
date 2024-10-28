import styles from "./styles.module.scss";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  isLarge?: boolean;
  [key: string]: any;
}

const Container: FunctionComponent<Props> = ({
  children,
  className = "",
  isLarge = false,
  ...props
}) => {
  return (
    <div
      className={`${styles.container} ${
        isLarge ? styles.large : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;