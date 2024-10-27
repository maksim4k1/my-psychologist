"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import LogoIcon from "@/client/assets/svg/Icons/Logo";
import TelegramIcon from "@/client/assets/svg/Icons/TelegramIcon";
import VkIcon from "@/client/assets/svg/Icons/VkIcon";
import IconButton from "@/client/components/UI/Buttons/IconButton";
import Container from "@/client/components/UI/Container";
import AppLink from "@/client/components/UI/Links/AppLink";
import { pages } from "@/shared/data";
import { type FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
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
