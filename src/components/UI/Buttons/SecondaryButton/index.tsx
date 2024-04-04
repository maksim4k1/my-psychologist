"use client";

import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import PrimaryButton from "../PrimaryButton";

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
    <PrimaryButton
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </PrimaryButton>
  );
};

export default SecondaryButton;
