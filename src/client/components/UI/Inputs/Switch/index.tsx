import styles from "./styles.module.scss";
import { type FunctionComponent } from "react";

interface Props {
  className?: string;
  [key: string]: any;
}

const Switch: FunctionComponent<Props> = ({ className = "", ...props }) => {
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

export default Switch;
