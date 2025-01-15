import styles from "./styles.module.scss";
import Link from "next/link";
import { LogoIcon } from "@/client/assets/icons";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const Logo: FC = () => {
  return (
    <Link
      href={pages.landing.path}
      className={styles.logo}
    >
      <LogoIcon />
    </Link>
  );
};
