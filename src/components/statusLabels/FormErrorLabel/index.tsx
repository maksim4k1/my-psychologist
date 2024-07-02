import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

const FormErrorLabel: FunctionComponent<Props> = ({ children }) => {
  return <div className={styles.errorLabel}>{children}</div>;
};

export default FormErrorLabel;
