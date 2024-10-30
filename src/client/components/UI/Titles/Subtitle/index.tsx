import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  children: string;
  className?: string;
  [key: string]: any;
}

export const Subtitle: FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <h2
      className={`${styles.title} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};
