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
import { selectRole } from "@/redux/features/auth/selectors";
import TestsService from "@/api/tests";
import {
  selectGetTestsByUserIdState,
  selectTestsByUserId,
} from "@/redux/features/tests/selectors";

function PsychologistClientPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const client = useAppSelector(selectClient);
  const clientState = useAppSelector(selectClientState);
  const tests = useAppSelector(selectTestsByUserId);
  const testsState = useAppSelector(selectGetTestsByUserIdState);
  const role = useAppSelector(selectRole);

  useEffect(() => {
    dispatch(ClientsService.getClient(id));
    dispatch(TestsService.getTestsByUserId(id));
  }, [dispatch, id]);

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        <LoadingWrapper status={[clientState.isLoading, testsState.isLoading]}>
          {client && <ProfileCard profile={client} />}
          <div>
            <Subtitle>
              {!!tests.length ? "Пройденные тесты" : "Нет пройденных тестов"}
            </Subtitle>
            {!!tests.length && (
              <div className={styles.tests}>
                {tests.map((el) => {
                  return (
                    <TestCard
                      key={el.id}
                      test={el}
                    />
                  );
                })}
              </div>
            )}
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
