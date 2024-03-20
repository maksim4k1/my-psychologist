"use client";

import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  isLarge?: boolean;
  isMedium?: boolean;
  className?: string;
  [key: string]: any;
}

const PrimaryButton: FunctionComponent<Props> = ({
  children,
  isLarge = false,
  isMedium = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${isLarge ? styles.large : ""} ${
        isMedium ? styles.medium : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
