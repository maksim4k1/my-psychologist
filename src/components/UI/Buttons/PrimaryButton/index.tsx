"use client";

import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

interface Props {
  children: ReactNode;
  isLarge?: boolean;
  isMedium?: boolean;
  className?: string;
  href?: string | null;
  [key: string]: any;
}

const PrimaryButton: FunctionComponent<Props> = ({
  children,
  isLarge = false,
  isMedium = false,
  className = "",
  href = null,
  ...props
}) => {
  return href === null ? (
    <button
      className={`${styles.button} ${isLarge ? styles.large : ""} ${
        isMedium ? styles.medium : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  ) : (
    <Link
      href={href}
      className={`${styles.button} ${isLarge ? styles.large : ""} ${
        isMedium ? styles.medium : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrimaryButton;
