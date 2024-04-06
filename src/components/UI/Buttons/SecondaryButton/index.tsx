"use client";

import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

interface Props {
  children: ReactNode;
  className?: string;
  isMedium?: boolean;
  [key: string]: any;
}

const SecondaryButton: FunctionComponent<Props> = ({
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

export default SecondaryButton;
