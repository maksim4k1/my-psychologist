"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import Tasks from "@/assets/svg/Tasks";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";

const cards = [
  {
    id: "testing",
    title: "Тестирование",
    description: "Познай себя",
    link: "/exercises",
  },
  {
    id: "tasks",
    title: "Задания",
    description: "Нужно выполнить",
    link: "#",
  },
  {
    id: "tracker",
    title: "Трекер настроения",
    description: "Отметь, как ты чувствуешь себя прямо сейчас",
    link: "#",
  },
  {
    id: "diary",
    title: "Дневник",
    description: "Расскажи, как прошёл день или выплесни эмоции",
    link: "#",
  },
];

function ProfilePage() {
  return (
    <Container>
      <PageTitle className={styles.title}>Моя программа</PageTitle>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((card) => {
            return (
              <Link
                href={card.link}
                className={styles.card}
                key={card.id}
              >
                <h4 className={styles.cardTitle}>{card.title}</h4>
                <p className={styles.cardDescription}>{card.description}</p>
              </Link>
            );
          })}
        </div>
        <div className={styles.icon}>
          <Tasks />
        </div>
      </div>
    </Container>
  );
}

export default checkAuth(ProfilePage, true, [ACCESS.client]);
