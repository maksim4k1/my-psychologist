"use client";

import styles from "./styles.module.scss";
import { ApplicationsService, ClientsService } from "@/client/api";
import ApplicationCard from "@/client/components/UI/Cards/ApplicationCard";
import ClientCard from "@/client/components/UI/Cards/ClientCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { applicationsActions } from "@/client/redux/features/applications";
import {
  selectApplications,
  selectApplicationsState,
} from "@/client/redux/features/applications/selectors";
import { type ApplicationData } from "@/client/redux/features/applications/types";
import { selectRole } from "@/client/redux/features/auth/selectors";
import { clientsActions } from "@/client/redux/features/clients";
import {
  selectClients,
  selectClientsState,
} from "@/client/redux/features/clients/selectors";
import { type ClientData } from "@/client/redux/features/clients/types";
import { type StatusState } from "@/client/utils";
import { ACCESS } from "@/shared/config/access.config";
import { type FC, useEffect } from "react";

export const CabinetPage: FC = () => {
  const dispatch = useAppDispatch();
  const applications: ApplicationData[] = useAppSelector(selectApplications);
  const applicationsState: StatusState = useAppSelector(
    selectApplicationsState,
  );
  const clients: ClientData[] = useAppSelector(selectClients);
  const clientsState: StatusState = useAppSelector(selectClientsState);
  const role = useAppSelector(selectRole);

  useEffect(() => {
    dispatch(ApplicationsService.getApplications());
    dispatch(ClientsService.getClients());
  }, [dispatch]);

  useSetDefaultState(applicationsActions.getApplicationsSetDefaultState);
  useSetDefaultState(clientsActions.getClientsSetDefaultState);

  return (
    <Container>
      <PageTitle className={styles.title}>
        Кабинет {role === ACCESS.psychologist ? "психолога" : "HR-менеджера"}
      </PageTitle>
      {/* <nav className={styles.navigation}>
        <IconTextLink
          href=""
          icon={<MessageIcon />}
          content="Сообщения"
          count={3}
        />
      </nav> */}

      <StateWrapper state={[applicationsState, clientsState]}>
        {!!applications.length && (
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
        )}
        <div>
          <h2 className={`${styles.subtitle} ${styles.clientsSubtitle}`}>
            {clients.length
              ? `Мои ${role === ACCESS.psychologist ? "клиенты" : "сотрудники"}`
              : `У вас нет ${
                  role === ACCESS.psychologist ? "клиентов" : "сотрудников"
                }`}
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
      </StateWrapper>
    </Container>
  );
};
