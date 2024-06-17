"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useParams } from "next/navigation";
import {
  selectClient,
  selectClientState,
} from "@/redux/features/clients/selectors";
import ClientsService from "@/api/clients";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import TestCard from "@/components/UI/Cards/TestCard";
import ProfileCard from "@/components/UI/Cards/ProfileCard";

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
        <LoadingWrapper status={clientState.isLoading}>
          {client && <ProfileCard profile={client} />}
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
              {/* <PrimaryButton href="./result/overall">
                Общий результат
              </PrimaryButton> */}
              <PrimaryButton href="./exercises">
                Назначить задание
              </PrimaryButton>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
