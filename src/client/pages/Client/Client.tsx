"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
  ProfileCard,
  Subtitle,
  TestCard,
} from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import {
  selectRole,
  useGetClientQuery,
  useGetUserPassedTestsQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ClientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const role = useAppSelector(selectRole);

  const { data: client, ...getClientState } = useGetClientQuery(id);
  const { data: passedTests, ...getUserPassedTestsState } =
    useGetUserPassedTestsQuery(id);

  if (getClientState.isLoading || getUserPassedTestsState.isLoading)
    return <LoadingLoop />;
  if (getClientState.isError)
    return <DefaultError error={getClientState.error} />;
  if (getUserPassedTestsState.isError)
    return <DefaultError error={getUserPassedTestsState.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        {client && <ProfileCard profile={client} />}
        <div>
          <Subtitle>
            {!!passedTests && !!passedTests.length
              ? "Пройденные тесты"
              : "Нет пройденных тестов"}
          </Subtitle>
          {!!passedTests && !!passedTests.length && (
            <div className={styles.tests}>
              {passedTests.map((el) => {
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
              href={pages.giveExercise.getLink({
                queryParams: {
                  userId: id,
                },
              })}
            >
              Назначить задание
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Container>
  );
};
