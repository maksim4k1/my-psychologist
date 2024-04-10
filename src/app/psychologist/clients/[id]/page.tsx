"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import { FunctionComponent } from "react";
import ProfileImage from "@/components/UI/Images/ProfileImage";
import Symptom from "@/components/UI/Symptom";
import MoreVerticalIcon from "@/assets/svg/Icons/MoreVerticalIcon";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Subtitle from "@/components/UI/Titles/Subtitle";
import Link from "next/link";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";

interface ClientCardProps {
  client: {
    profileImage: string;
    username: string;
    isOnline: boolean;
    age: number;
    diagnose: string;
    problems: string[];
  };
}

const ClientCard: FunctionComponent<ClientCardProps> = ({ client }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.username}>{client.username}</div>
          <div
            className={`${styles.status} ${
              client.isOnline ? styles.isOnline : ""
            }`}
          >
            {client.isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
        <button className={styles.moreButton}>
          <MoreVerticalIcon />
        </button>
      </div>
      <ProfileImage
        className={styles.profileImage}
        size={188}
        src={client.profileImage}
        alt={client.username}
      />
      <div className={styles.info}>Возраст: {client.age} лет</div>
      <div className={styles.info}>Диагноз: {client.diagnose}</div>
      <div className={styles.info}>Отмечено клиентом:</div>
      <div className={styles.problems}>
        {client.problems.map((problem, index) => {
          return (
            <Symptom
              key={index}
              problem={problem}
            />
          );
        })}
      </div>
      <PrimaryButton className={styles.cardButton}>Чат</PrimaryButton>
    </div>
  );
};

interface TestProps {
  test: {
    id: number;
    title: string;
  };
}

const TestCard: FunctionComponent<TestProps> = ({ test }) => {
  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{test.title}</div>
      <Link
        className={styles.testLink}
        href={`/test/${test.id}`}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};

function PsychologistClientPage() {
  return (
    <Container>
      <PageTitle className={styles.title}>Профиль клиента</PageTitle>
      <div className={styles.main}>
        <ClientCard
          client={{
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            username: "Ангелина",
            isOnline: false,
            age: 26,
            diagnose: "депрессия",
            problems: ["Панические атаки", "СДВГ", "Социофобия", "РПП"],
          }}
        />
        <div>
          <Subtitle>Пройденные тесты</Subtitle>
          <div className={styles.tests}>
            <TestCard
              test={{
                id: 1,
                title: "Профессиональное выгорание",
              }}
            />
            <TestCard
              test={{
                id: 2,
                title: "Шкала депрессии, тревоги и стресса",
              }}
            />
            <TestCard
              test={{
                id: 3,
                title: "Шкала тревоги Спилбергера-Ханина",
              }}
            />
          </div>
          <PrimaryButton>Посмотреть все тесты</PrimaryButton>
        </div>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientPage, true, [ACCESS.psychologist]);
