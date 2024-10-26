"use client";

import Button from "../Button";
import styles from "./styles.module.scss";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  isMedium?: boolean;
  [key: string]: any;
}

const AppButton: FunctionComponent<Props> = ({
  children,
  className = "",
  isMedium = false,
  ...props
}) => {
  return (
    <Button
      className={`${styles.button} ${className} ${
        isMedium ? styles.medium : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
