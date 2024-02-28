import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: string;
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
