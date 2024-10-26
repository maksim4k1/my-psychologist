"use client";

import styles from "./styles.module.scss";
import { type FunctionComponent } from "react";

interface Props {
  labelText: string;
  className?: string;
  [key: string]: any;
}

const Checkbox: FunctionComponent<Props> = ({
  labelText = "",
  className = "",
  ...props
}) => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={`${styles.checkbox} ${className}`}
        {...props}
      />
      <span className={styles.labelText}>{labelText}</span>
    </label>
  );
};

export default Checkbox;
