"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../config/access.config";
import ApplicationCard from "@/components/UI/Cards/ApplicationCard";
import ClientCard from "@/components/UI/Cards/ClientCard";
import { ApplicationData } from "@/redux/features/applications/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import ApplicationsService from "@/api/applications";
import {
  selectApplications,
  selectApplicationsState,
} from "@/redux/features/applications/selectors";
import { StatusState } from "@/utils/stateCreators";
import ClientsService from "@/api/clients";
import { ClientData } from "@/redux/features/clients/types";
import {
  selectClients,
  selectClientsState,
} from "@/redux/features/clients/selectors";
import { selectRole } from "@/redux/features/auth/selectors";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { applicationsActions } from "@/redux/features/applications";
import { clientsActions } from "@/redux/features/clients";

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

  useSetDefaultState(applicationsActions.getApplicationsSetDefaultState());
  useSetDefaultState(clientsActions.getClientsSetDefaultState());

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
            {!!clients.length
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
