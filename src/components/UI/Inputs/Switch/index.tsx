import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  [key: string]: any;
}

const Switch: FunctionComponent<Props> = ({ className = "", ...props }) => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={`${styles.input} ${className}`}
        {...props}
      />
      <span className={styles.switch}>
        <span className={styles.circle}></span>
      </span>
    </label>
  );
};

export default Switch;
