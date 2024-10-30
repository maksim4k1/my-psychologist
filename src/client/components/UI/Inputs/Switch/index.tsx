import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  className?: string;
  [key: string]: any;
}

export const Switch: FC<Props> = ({ className = "", ...props }) => {
  return (
    <label className={`${styles.label} ${className}`}>
      <input
        type="checkbox"
        className={styles.input}
        {...props}
      />
      <span className={styles.switch}>
        <span className={styles.circle}></span>
      </span>
    </label>
  );
};
