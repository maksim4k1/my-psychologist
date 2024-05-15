"use client";

import { ChangeEvent, FunctionComponent, useEffect, useRef } from "react";
import styles from "../styles.module.scss";

interface Props {
  labelText?: string;
  exampleText?: string;
  errorText?: string;
  className?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]: any;
}

const Textarea: FunctionComponent<Props> = ({
  labelText,
  exampleText,
  errorText,
  className = "",
  value = "",
  onChange,
  ...props
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "56px";
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (onChange) {
      onChange(event);
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
        className={`${styles.input} ${styles.textarea} ${styles.textInput} ${
          errorText ? styles.error : ""
        } ${className}`}
        {...props}
        defaultValue={value}
        onChange={onChangeHandler}
      />
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default Textarea;
