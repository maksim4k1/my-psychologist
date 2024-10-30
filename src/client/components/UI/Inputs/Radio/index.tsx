"use client";

import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  labelText: string;
  className?: string;
  [key: string]: any;
}

export const Radio: FC<Props> = ({
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
