"use client";

import { AppButton } from "../AppButton";
import styles from "./styles.module.scss";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const PrimaryButton: FC<Props> = ({
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
