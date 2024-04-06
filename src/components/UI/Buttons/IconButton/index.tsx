import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

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
