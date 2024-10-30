import styles from "./styles.module.scss";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  isLarge?: boolean;
  [key: string]: any;
}

export const Container: FC<Props> = ({
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
