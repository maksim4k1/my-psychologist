import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  problem: string;
}

export const Symptom: FC<Props> = ({ problem }) => {
  return <span className={styles.problem}>{problem}</span>;
};
