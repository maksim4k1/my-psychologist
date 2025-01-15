"use client";

import { SecondaryButton } from "../../../Buttons";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/client/hooks";
import { selectProfile } from "@/client/redux";
import { type ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC } from "react";

interface NavLink {
  href: string;
  title: string;
}

type Nav = Record<keyof typeof ACCESS, NavLink[]>;

const rolesNav: Nav = {
  admin: [
    { href: pages.usersAcitivity.path, title: "Активность пользователей" },
    { href: pages.usersFeedbacks.path, title: "Обратная связь" },
    { href: pages.usersResults.path, title: "Результаты тестов" },
  ],
  client: [
    { href: pages.profile.path, title: "План" },
    { href: pages.articles.path, title: "Теория" },
    { href: pages.exercises.path, title: "Тесты" },
    { href: pages.psychologist.path, title: "Психологи" },
  ],
  hr: [
    { href: pages.profile.path, title: "План" },
    { href: pages.articles.path, title: "Теория" },
    { href: pages.exercises.path, title: "Тесты" },
    { href: pages.psychologist.path, title: "Психологи" },
  ],
  psychologist: [
    { href: pages.profile.path, title: "План" },
    { href: pages.articles.path, title: "Теория" },
    { href: pages.exercises.path, title: "Тесты" },
    { href: pages.psychologist.path, title: "Психологи" },
  ],
  unauthorized: [],
};

export const NavBar: FC = () => {
  const userData = useAppSelector(selectProfile);

  const navList = rolesNav[userData.role];

  return (
    <nav className={styles.nav}>
      {navList.map((el) => (
        <SecondaryButton
          key={el.title}
          className={styles.navLink}
          href={el.href}
        >
          {el.title}
        </SecondaryButton>
      ))}
    </nav>
  );
};
