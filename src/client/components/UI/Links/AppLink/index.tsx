import styles from "./styles.module.scss";
import Link from "next/link";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
}

export const AppLink: FC<Props> = ({ children, href, className = "" }) => {
  return (
    <Link
      href={href}
      className={`${styles.link} ${className}`}
    >
      {children}
    </Link>
  );
};
