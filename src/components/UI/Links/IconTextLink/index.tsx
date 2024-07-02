import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  href: string;
  icon: ReactNode;
  content: string;
  count?: number;
}

const IconTextLink: FunctionComponent<Props> = ({
  href,
  icon,
  content,
  count = 0,
}) => {
  return (
    <Link
      href={href}
      className={styles.link}
    >
      {icon}
      {count > 0 && (
        <span className={`${styles.count} ${count > 9 ? styles.bigCount : ""}`}>
          {count > 9 ? "9+" : count}
        </span>
      )}
      <span className={styles.content}>{content}</span>
    </Link>
  );
};

export default IconTextLink;
