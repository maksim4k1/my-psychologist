"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import { FunctionComponent, useEffect } from "react";
import ProfileImage from "@/components/UI/Images/ProfileImage";
import Symptom from "@/components/UI/Symptom";
import MoreVerticalIcon from "@/assets/svg/Icons/MoreVerticalIcon";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Subtitle from "@/components/UI/Titles/Subtitle";
import Link from "next/link";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import { ClientProfileData } from "@/redux/features/clients/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useParams } from "next/navigation";
import {
  selectClient,
  selectClientState,
} from "@/redux/features/clients/selectors";
import ClientsService from "@/api/clients";

interface ClientCardProps {
  client: ClientProfileData;
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
      {!!client.problems.length && <div className={styles.info}>Запрос:</div>}
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
        href={`/psychologist/clients/result`}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};

function PsychologistClientPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const client = useAppSelector(selectClient);
  const clientState = useAppSelector(selectClientState);

  useEffect(() => {
    dispatch(ClientsService.getClient(id));
  }, [dispatch, id]);

  return (
    <Container>
      <PageTitle className={styles.title}>Профиль клиента</PageTitle>
      <div className={styles.main}>
        {clientState.isLoading
          ? "Loading..."
          : client && <ClientCard client={client} />}
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
          <div className={styles.buttons}>
            <PrimaryButton href="./result/overall">
              Общий результат
            </PrimaryButton>
            <SecondaryButton href="./exercises">
              Назначить задание
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientPage, true, [ACCESS.psychologist]);
