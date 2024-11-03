"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { TestsService } from "@/client/api";
import {
  Container,
  DefaultError,
  LoadingLoop,
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
  selectGetTestsByUserIdState,
  selectRole,
  selectTestsByUserId,
  testsActions,
  useGetClientQuery,
} from "@/client/redux";
import { addQueryParams } from "@/client/utils";
import { ACCESS } from "@/shared/config/access.config";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

export const ClientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTestsByUserId);
  const testsState = useAppSelector(selectGetTestsByUserIdState);
  const role = useAppSelector(selectRole);

  const clientQuery = useGetClientQuery(id);

  useEffect(() => {
    dispatch(TestsService.getTestsByUserId(id));
  }, [dispatch, id]);

  useSetDefaultState(testsActions.getTestsByUserIdSetDefaultState);

  if (clientQuery.isLoading) return <LoadingLoop />;
  if (clientQuery.isError) return <DefaultError error={clientQuery.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        <StateWrapper state={[testsState]}>
          {clientQuery.data && <ProfileCard profile={clientQuery.data} />}
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
