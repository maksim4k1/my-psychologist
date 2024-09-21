"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import ClientsService from "@/api/clients";
import TestsService from "@/api/tests";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import ProfileCard from "@/components/UI/Cards/ProfileCard";
import TestCard from "@/components/UI/Cards/TestCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { selectRole } from "@/redux/features/auth/selectors";
import { clientsActions } from "@/redux/features/clients";
import {
  selectClient,
  selectClientState,
} from "@/redux/features/clients/selectors";
import { testsActions } from "@/redux/features/tests";
import {
  selectGetTestsByUserIdState,
  selectTestsByUserId,
} from "@/redux/features/tests/selectors";
import { addQueryParams } from "@/utils/urlUtils";
import { useEffect } from "react";

function PsychologistClientPage() {
  const { id } = useParams<{ id: string }>();
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

  useSetDefaultState(clientsActions.getClientSetDefaultState);
  useSetDefaultState(testsActions.getTestsByUserIdSetDefaultState);

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        <StateWrapper state={[clientState, testsState]}>
          {client && <ProfileCard profile={client} />}
          <div>
            <Subtitle>
              {tests.length ? "Пройденные тесты" : "Нет пройденных тестов"}
            </Subtitle>
            {!!tests.length && (
              <div className={styles.tests}>
                {tests.map((el) => {
                  return (
                    <TestCard
                      key={el.id}
                      test={el}
                      params={{ userId: id }}
                    />
                  );
                })}
              </div>
            )}
            <div className={styles.buttons}>
              {/* <PrimaryButton href="./result/overall">
                Общий результат
              </PrimaryButton> */}
              <PrimaryButton
                href={addQueryParams("/exercises/give", {
                  userId: id,
                })}
              >
                Назначить задание
              </PrimaryButton>
            </div>
          </div>
        </StateWrapper>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
