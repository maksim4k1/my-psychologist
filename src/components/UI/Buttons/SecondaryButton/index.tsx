"use client";

import AppButton from "../AppButton";
import styles from "./styles.module.scss";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const SecondaryButton: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <AppButton
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </AppButton>
  );
};

export default SecondaryButton;
