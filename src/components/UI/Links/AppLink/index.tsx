import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
}

const AppLink: FunctionComponent<Props> = ({
  children,
  href,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`${styles.link} ${className}`}
    >
      {children}
    </Link>
  );
};

export default AppLink;
