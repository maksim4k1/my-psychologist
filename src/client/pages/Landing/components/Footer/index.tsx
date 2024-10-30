"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { LogoIcon, TelegramIcon, VkIcon } from "@/client/assets/icons";
import { AppLink, Container, IconButton } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Container
        isLarge={true}
        className={styles.container}
      >
        <Link
          href={pages.landing.path}
          className={styles.logo}
        >
          <LogoIcon />
        </Link>
        <div className={styles.contacts}>
          <div className={styles.socials}>
            <IconButton
              className={styles.iconButton}
              href="https://vk.com/discuss_with_cbt"
              target="_blank"
            >
              <VkIcon />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              href="https://t.me/discuss_with_cbt"
              target="_blank"
            >
              <TelegramIcon />
            </IconButton>
          </div>
          <AppLink href="mailto:tim.sim4@yandex.ru">tim.sim4@yandex.ru</AppLink>
        </div>
      </Container>
    </footer>
  );
};
