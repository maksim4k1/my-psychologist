import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  problem: string;
}

const Symptom: FunctionComponent<Props> = ({ problem }) => {
  return <span className={styles.problem}>{problem}</span>;
};

export default Symptom;
