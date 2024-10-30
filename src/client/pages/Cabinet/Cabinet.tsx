"use client";

import styles from "./styles.module.scss";
import { ApplicationsService, ClientsService } from "@/client/api";
import {
  ApplicationCard,
  ClientCard,
  Container,
  PageTitle,
  StateWrapper,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
import {
  applicationsActions,
  clientsActions,
  selectApplications,
  selectApplicationsState,
  selectClients,
  selectClientsState,
  selectRole,
} from "@/client/redux";
import { type StatusState } from "@/client/utils";
import { ACCESS } from "@/shared/config/access.config";
import { type FC, useEffect } from "react";

export const CabinetPage: FC = () => {
  const dispatch = useAppDispatch();
  const applications = useAppSelector(selectApplications);
  const applicationsState: StatusState = useAppSelector(
    selectApplicationsState,
  );
  const clients = useAppSelector(selectClients);
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
                    application={application}
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
