"use client";

import styles from "./styles.module.scss";
import { type FunctionComponent } from "react";

interface Props {
  labelText: string;
  className?: string;
  [key: string]: any;
}

const Radio: FunctionComponent<Props> = ({
  labelText = "",
  className = "",
  ...props
}) => {
  return (
    <label className={styles.label}>
      <input
        type="radio"
        className={`${styles.radio} ${className}`}
        {...props}
      />
      <span className={styles.labelText}>{labelText}</span>
    </label>
  );
};

export default Radio;
