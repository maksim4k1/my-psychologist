"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string | null;
  [key: string]: any;
}

const Button: FunctionComponent<Props> = ({
  children,
  className = "",
  href = null,
  ...props
}) => {
  return href === null ? (
    <button
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  ) : (
    <Link
      href={href}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;
