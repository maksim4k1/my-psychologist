"use client";

import styles from "./styles.module.scss";
import { type FieldConfig, useField } from "formik";
import { type ChangeEvent, type FC, type TextareaHTMLAttributes } from "react";

type Props = FieldConfig &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    labelText?: string;
    exampleText?: string;
  };

export const Textarea: FC<Props> = ({ labelText, exampleText, ...props }) => {
  const [field, meta] = useField(props.name);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "56px";
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (field.onChange) {
      field.onChange(event);
    }
  };

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
      <textarea
        {...props}
        {...field}
        className={`${styles.input} ${styles.textarea} ${
          meta.error && meta.touched ? styles.error : ""
        } ${props.className ?? ""}`}
        onChange={onChangeHandler}
      ></textarea>
      {meta.error && meta.touched && (
        <div className={styles.errorText}>{meta.error}</div>
      )}
    </div>
  );
};
