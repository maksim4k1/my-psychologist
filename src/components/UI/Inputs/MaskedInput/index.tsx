"use client";

import { FunctionComponent } from "react";
import styles from "../styles.module.scss";
import { IMaskInput } from "react-imask";

interface Props {
  labelText?: string;
  exampleText?: string;
  errorText?: string;
  className?: string;
  type?: string;
  mask?: any;
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
