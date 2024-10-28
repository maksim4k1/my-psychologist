"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import ClientsService from "@/client/api/clients";
import TestsService from "@/client/api/tests";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import ProfileCard from "@/client/components/UI/Cards/ProfileCard";
import TestCard from "@/client/components/UI/Cards/TestCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { selectRole } from "@/client/redux/features/auth/selectors";
import { clientsActions } from "@/client/redux/features/clients";
import {
  selectClient,
  selectClientState,
} from "@/client/redux/features/clients/selectors";
import { testsActions } from "@/client/redux/features/tests";
import {
  selectGetTestsByUserIdState,
  selectTestsByUserId,
} from "@/client/redux/features/tests/selectors";
import { addQueryParams } from "@/client/utils";
import { ACCESS } from "@/shared/config/access.config";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

export const ClientPage: FC = () => {
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
                href={addQueryParams(pages.giveExercise.path, {
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
};