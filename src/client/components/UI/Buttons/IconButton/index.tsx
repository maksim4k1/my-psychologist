import { Button } from "../Button";
import styles from "./styles.module.scss";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const IconButton: FC<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};
