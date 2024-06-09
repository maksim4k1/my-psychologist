"use client";

import MessageIcon from "@/assets/svg/Icons/MessageIcon";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import IconTextLink from "@/components/UI/Links/IconTextLink";
import styles from "./styles.module.scss";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../config/access.config";
import ApplicationCard from "@/components/UI/Cards/ApplicationCard";
import ClientCard from "@/components/UI/Cards/ClientCard";
import { ApplicationData } from "@/redux/features/applications/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import ApplicationsServise from "@/api/applications";
import {
  selectApplications,
  selectApplicationsState,
} from "@/redux/features/applications/selectors";
import { StatusState } from "@/utils/stateCreators";

interface Client {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

function PsychologistPage() {
  const dispatch = useAppDispatch();
  const applications: ApplicationData[] = useAppSelector(selectApplications);
  const { isLoading }: StatusState = useAppSelector(selectApplicationsState);

  useEffect(() => {
    dispatch(ApplicationsServise.getApplications());
  }, []);

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
        {isLoading ? (
          "Loading..."
        ) : (
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
        )}
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
