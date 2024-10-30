"use client";

import styles from "../styles.module.scss";
import { type FC } from "react";

interface Props {
  labelText?: string;
  exampleText?: string;
  errorText?: string;
  className?: string;
  required?: boolean;
  [key: string]: any;
}

export const Input: FC<Props> = ({
  labelText,
  exampleText,
  errorText,
  className = "",
  ...props
}) => {
  return (
    <div className={styles.label}>
      {(!!labelText || !!exampleText) && (
        <div>
          {!!labelText && (
            <span
              className={`${styles.labelText} ${
                props.required ? styles.required : ""
              }`}
            >
              {labelText}
            </span>
          )}
          {!!exampleText && (
            <span className={styles.exampleText}>{exampleText}</span>
          )}
        </div>
      )}
      <input
        className={`${styles.input} ${styles.textInput} ${
          errorText ? styles.error : ""
        } ${className}`}
        {...props}
      />
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};
