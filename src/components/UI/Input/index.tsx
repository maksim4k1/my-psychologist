"use client";

import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  labelText: string;
  supportText?: string;
  className?: string;
  [key: string]: any;
}

const Input: FunctionComponent<Props> = ({
  errorText,
  labelText = "",
  className = "",
  ...props
}) => {
  return (
    <div className={styles.label}>
      <input
        className={`${styles.input} ${
          errorText ? styles.error : ""
        } ${className}`}
        {...props}
      />
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default Input;
