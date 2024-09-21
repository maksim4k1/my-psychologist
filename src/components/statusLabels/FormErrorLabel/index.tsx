import styles from "./styles.module.scss";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormErrorLabel: FunctionComponent<Props> = ({ children }) => {
  return <div className={styles.errorLabel}>{children}</div>;
};

export default FormErrorLabel;
