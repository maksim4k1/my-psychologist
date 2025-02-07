"use client";

import styles from "./styles.module.scss";
import { type FieldConfig, useField } from "formik";
import { type FC, type InputHTMLAttributes } from "react";

type Props = FieldConfig &
  InputHTMLAttributes<HTMLInputElement> & {
    labelText?: string;
    exampleText?: string;
  };

export const Input: FC<Props> = ({ labelText, exampleText, ...props }) => {
  const [field, meta] = useField(props.name);

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
        {...field}
        {...props}
        className={`${styles.input} ${styles.textInput} ${
          meta.error && meta.touched ? styles.error : ""
        } ${props.className ?? ""}`}
      />
      {meta.error && meta.touched && (
        <div className={styles.errorText}>{meta.error}</div>
      )}
    </div>
  );
};
