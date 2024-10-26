"use client";

import styles from "../styles.module.scss";
import { type FunctionComponent } from "react";

interface Props {
  labelText?: string;
  exampleText?: string;
  errorText?: string;
  className?: string;
  required?: boolean;
  [key: string]: any;
}

const Input: FunctionComponent<Props> = ({
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

export default Input;
