"use client";

import styles from "../styles.module.scss";
import { IMaskInput } from "react-imask";
import { type FunctionComponent } from "react";

interface Props {
  labelText?: string;
  exampleText?: string;
  errorText?: string;
  className?: string;
  type?: string;
  mask?: any;
  required?: boolean;
  [key: string]: any;
}

const MaskedInput: FunctionComponent<Props> = ({
  labelText,
  exampleText,
  errorText,
  className = "",
  type = "string",
  mask = "",
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
      <IMaskInput
        className={`${styles.input} ${styles.textInput} ${
          errorText ? styles.error : ""
        } ${className}`}
        type={type}
        mask={type === "tel" ? "+0(000)000-00-00" : mask}
        {...props}
      />
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default MaskedInput;
