"use client";

import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import {
  Container,
  DefaultError,
  GiveExerciseCard,
  LoadingLoop,
  PageTitle,
  Subtitle,
} from "@/client/components";
import { useGetTestsQuery } from "@/client/redux";
import { type FC } from "react";

export const GiveExercisePage: FC = () => {
  const searchParams = useSearchParams();

  const { data: tests, ...getTestsState } = useGetTestsQuery();

  if (getTestsState.isLoading) return <LoadingLoop />;
  if (getTestsState.isError)
    return <DefaultError error={getTestsState.error} />;

  return (
    <Container>
      <PageTitle>Задания для клиента</PageTitle>
      <div className={styles.section}>
        <Subtitle>
          {!!tests && !!tests.length ? "Тесты" : "Нет доступных тестов"}
        </Subtitle>
        {!!tests && !!tests.length && (
          <div className={styles.list}>
            {tests.map((test) => {
              return (
                <GiveExerciseCard
                  key={test.id}
                  exercise={test}
                  userId={searchParams.get("userId") ?? ""}
                />
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};
