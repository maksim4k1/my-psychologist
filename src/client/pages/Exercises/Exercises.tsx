"use client";

import styles from "./styles.module.scss";
import {
  Container,
  DefaultError,
  ExerciseCard,
  LoadingLoop,
  PageTitle,
  Subtitle,
} from "@/client/components";
import { useGetTestsQuery } from "@/client/redux";
import { type FC } from "react";

export const ExercisesPage: FC = () => {
  const { data: tests, ...getTestsState } = useGetTestsQuery();

  if (getTestsState.isLoading) return <LoadingLoop />;
  if (getTestsState.isError)
    return <DefaultError error={getTestsState.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>Психологические тесты</PageTitle>
      <div className={styles.section}>
        {(!tests || !tests.length) && <Subtitle>Нет доступных тестов</Subtitle>}
        {!!tests && !!tests.length && (
          <div className={styles.list}>
            {tests.map((test) => {
              return (
                <ExerciseCard
                  key={test.id}
                  exercise={test}
                />
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};
