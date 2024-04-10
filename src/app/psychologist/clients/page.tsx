"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import ProfileImage from "@/components/UI/Images/ProfileImage";
import MoreVerticalIcon from "@/assets/svg/Icons/MoreVerticalIcon";
import { FunctionComponent } from "react";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import Symptom from "@/components/UI/Symptom";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";

interface Props {
  client: {
    userId: number;
    profileImage: string;
    username: string;
    isOnline: boolean;
    problems: string[];
  };
}

const ClientCard: FunctionComponent<Props> = ({ client }) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={client.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
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
      <div className={styles.buttons}>
        <SecondaryButton>Чат</SecondaryButton>
        <PrimaryButton href={`./clients/${client.userId}`}>
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};

function PsychologistClientsPage() {
  return (
    <Container>
      <PageTitle className={styles.title}>Мои клиенты</PageTitle>
      <div className={styles.list}>
        <ClientCard
          client={{
            userId: 1,
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            username: "Александр",
            isOnline: false,
            problems: ["Депрессия", "Зависимости", "Выгорание"],
          }}
        />
        <ClientCard
          client={{
            userId: 2,
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            username: "Алиса",
            isOnline: true,
            problems: ["ПТСР", "Тревога", "РПП", "Депрессия"],
          }}
        />
        <ClientCard
          client={{
            userId: 3,
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            username: "Виктор",
            isOnline: true,
            problems: ["Выгорание"],
          }}
        />
        <ClientCard
          client={{
            userId: 4,
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            username: "Ангелина",
            isOnline: false,
            problems: ["Панические атаки", "СДВГ", "Социофобия"],
          }}
        />
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientsPage, true, [ACCESS.psychologist]);
