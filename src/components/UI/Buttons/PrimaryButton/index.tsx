"use client";

import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import AppButton from "../AppButton";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const PrimaryButton: FunctionComponent<Props> = ({
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

export default PrimaryButton;
