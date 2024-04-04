import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: string;
  className?: string;
  [key: string]: any;
}

const Subtitle: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h3
      className={`${styles.title} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export default Subtitle;
