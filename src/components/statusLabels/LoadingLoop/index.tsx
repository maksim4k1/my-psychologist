import LoadingIcon from "@/assets/svg/Icons/LoadingIcon";
import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

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
