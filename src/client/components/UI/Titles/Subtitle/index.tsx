import styles from "./styles.module.scss";
import { type FunctionComponent } from "react";

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
    <h2
      className={`${styles.title} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Subtitle;
