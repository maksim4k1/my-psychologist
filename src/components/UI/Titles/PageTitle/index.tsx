import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const PageTitle: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h1
      className={`${styles.title} ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
