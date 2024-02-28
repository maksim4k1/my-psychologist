import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const PrimaryLink: FunctionComponent<Props> = ({
  href,
  children,
  className = "",
  ...props
}) => {
  return (
    <Link
      href={href}
      className={`${styles.link} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
