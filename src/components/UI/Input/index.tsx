"use client";

import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  [key: string]: any;
}

const Input: FunctionComponent<Props> = ({ className = "", ...props }) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      {...props}
    />
  );
};

export default Input;
