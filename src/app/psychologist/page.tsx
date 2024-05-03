"use client";

import MessageIcon from "@/assets/svg/Icons/MessageIcon";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import IconTextLink from "@/components/UI/Links/IconTextLink";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../config/access.config";
import ApplicationCard from "@/components/UI/Cards/ApplicationCard";
import ClientCard from "@/components/UI/Cards/ClientCard";

interface Application {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problem: string;
}

interface Client {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

async function PsychologistPage() {
  const applications: Application[] = [
    {
      userId: 1,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Евгений",
      isOnline: true,
      problem:
        "Здравствуйте! За эту неделю я выгорел уже 20 раз и больше не намерен это терпеть",
    },
    {
      userId: 2,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Евгений",
      isOnline: true,
      problem: "Я думаю, что за мной следит утка, что мне делать?",
    },
    {
      userId: 3,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Александра",
      isOnline: true,
      problem: "Привет, я не люблю общаться с людьми, только со своей собакой",
    },
    {
      userId: 4,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Ангелина",
      isOnline: true,
      problem:
        "Здравствуйте! Я страдаю от паниеских атак почти три года и хотела бы сделать с этим что нибудь, вы можете мне помочь? ",
    },
  ];
  const clients: Client[] = [
    {
      userId: 1,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Александр",
      isOnline: false,
      problems: ["Депрессия", "Зависимости", "Выгорание"],
    },
    {
      userId: 2,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Алиса",
      isOnline: true,
      problems: ["ПТСР", "Тревога", "РПП", "Депрессия"],
    },
    {
      userId: 3,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Виктор",
      isOnline: true,
      problems: ["Выгорание"],
    },
    {
      userId: 4,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      username: "Ангелина",
      isOnline: false,
      problems: ["Панические атаки", "СДВГ", "Социофобия"],
    },
  ];

  return (
    <Container>
      <PageTitle>Кабинет психолога</PageTitle>
      <nav className={styles.navigation}>
        <IconTextLink
          href=""
          icon={<MessageIcon />}
          content="Сообщения"
          count={3}
        />
      </nav>

      <div>
        <h2 className={styles.subtitle}>Заявки</h2>
        <div className={styles.list}>
          {applications.map((application) => {
            return (
              <ApplicationCard
                key={application.userId}
                client={application}
              />
            );
          })}
        </div>
      </div>
      <div>
        <h2 className={`${styles.subtitle} ${styles.clientsSubtitle}`}>
          Мои клиенты
        </h2>
        <div className={styles.list}>
          {clients.map((client) => {
            return (
              <ClientCard
                key={client.userId}
                client={client}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistPage, true, [ACCESS.psychologist]);
