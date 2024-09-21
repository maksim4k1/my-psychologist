import styles from "./styles.module.scss";
import { type FunctionComponent } from "react";

interface Props {
  problem: string;
}

const Symptom: FunctionComponent<Props> = ({ problem }) => {
  return <span className={styles.problem}>{problem}</span>;
};

export default Symptom;
