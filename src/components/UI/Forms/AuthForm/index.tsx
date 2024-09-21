import PageTitle from "../../Titles/PageTitle";
import Form from "../Form";
import styles from "./styles.module.scss";
import Meditation from "@/assets/svg/Meditation";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  className?: string;
  [key: string]: any;
}

const AuthForm: FunctionComponent<Props> = ({
  children,
  title,
  className = "",
  ...props
}) => {
  return (
    <div className={styles.container}>
      <Form
        className={`${styles.form} ${className}`}
        {...props}
      >
        {!!title && <PageTitle className={styles.title}>{title}</PageTitle>}
        {children}
      </Form>
      <div className={styles.svgContainer}>
        <Meditation />
      </div>
    </div>
  );
};

export default AuthForm;
