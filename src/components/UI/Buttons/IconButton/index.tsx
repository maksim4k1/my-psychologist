import Button from "../Button";
import styles from "./styles.module.scss";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const IconButton: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
