"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { ClientsService, TestsService } from "@/client/api";
import {
  Container,
  PageTitle,
  PrimaryButton,
  ProfileCard,
  StateWrapper,
  Subtitle,
  TestCard,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
import {
  clientsActions,
  selectClient,
  selectClientState,
  selectGetTestsByUserIdState,
  selectRole,
  selectTestsByUserId,
  testsActions,
} from "@/client/redux";
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
