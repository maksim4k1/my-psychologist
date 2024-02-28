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
    <div className={styles.label}>
      <span className={styles.labelText}>{labelText}</span>
      <input
        className={`${styles.input} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
