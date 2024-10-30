import styles from "./styles.module.scss";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const FormErrorLabel: FC<Props> = ({ children }) => {
  return <div className={styles.errorLabel}>{children}</div>;
};
