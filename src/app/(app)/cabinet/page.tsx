"use client";

import styles from "./styles.module.scss";
import ApplicationsService from "@/api/applications";
import ClientsService from "@/api/clients";
import ApplicationCard from "@/components/UI/Cards/ApplicationCard";
import ClientCard from "@/components/UI/Cards/ClientCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import checkAuth from "@/components/hocs/checkAuth";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { applicationsActions } from "@/redux/features/applications";
import {
  selectApplications,
  selectApplicationsState,
} from "@/redux/features/applications/selectors";
import { type ApplicationData } from "@/redux/features/applications/types";
import { selectRole } from "@/redux/features/auth/selectors";
import { clientsActions } from "@/redux/features/clients";
import {
  selectClients,
  selectClientsState,
} from "@/redux/features/clients/selectors";
import { type ClientData } from "@/redux/features/clients/types";
import { type StatusState } from "@/utils/stateCreators";
import { useEffect } from "react";

function PsychologistPage() {
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
}

export default checkAuth(PsychologistPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
