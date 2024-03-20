"use client";

import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  isLarge?: boolean;
  className?: string;
  [key: string]: any;
}

const SecondaryButton: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
