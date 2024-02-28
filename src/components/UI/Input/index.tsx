"use client";

import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  labelText: string;
  className?: string;
  [key: string]: any;
}

const Input: FunctionComponent<Props> = ({
  labelText,
  className = "",
  ...props
}) => {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{labelText}</span>
      <input
        className={`${styles.input} ${className}`}
        {...props}
      />
    </label>
  );
};

export default Input;
