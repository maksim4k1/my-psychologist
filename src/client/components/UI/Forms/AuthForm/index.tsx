import { PageTitle } from "../../Titles";
import { Form } from "../Form";
import styles from "./styles.module.scss";
import { Meditation } from "@/client/assets/svg";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  className?: string;
  [key: string]: any;
}

export const AuthForm: FC<Props> = ({
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
