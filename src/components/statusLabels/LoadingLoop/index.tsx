import styles from "./styles.module.scss";
import LoadingIcon from "@/assets/svg/Icons/LoadingIcon";
import { type FunctionComponent } from "react";

const LoadingLoop: FunctionComponent = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingIcon}>
        <LoadingIcon />
      </div>
    </div>
  );
};

export default LoadingLoop;
