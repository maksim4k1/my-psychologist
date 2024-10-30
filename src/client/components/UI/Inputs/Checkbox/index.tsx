"use client";

import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  labelText: string;
  className?: string;
  [key: string]: any;
}

export const Checkbox: FC<Props> = ({
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
