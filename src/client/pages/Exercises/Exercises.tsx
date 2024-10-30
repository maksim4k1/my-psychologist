"use client";

import styles from "./styles.module.scss";
import { TestsService } from "@/client/api";
import ExerciseCard from "@/client/components/UI/Cards/ExerciseCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import LoadingWrapper from "@/client/components/wrappers/LoadingWrapper";
import { useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { selectGetTestsState, selectTests, testsActions } from "@/client/redux";
import { type FC, useEffect } from "react";

export const ExercisesPage: FC = () => {
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);
  const testsState = useAppSelector(selectGetTestsState);

  useEffect(() => {
    dispatch(TestsService.getTests());
  }, [dispatch]);

  useSetDefaultState(testsActions.getTestsSetDefaultState);

  return (
    <Container>
      <PageTitle className={styles.title}>Психологические тесты</PageTitle>
      <div className={styles.section}>
        <LoadingWrapper status={testsState.isLoading}>
          {!tests.length && <Subtitle>Нет доступных тестов</Subtitle>}
          {!!tests.length && (
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
        </LoadingWrapper>
      </div>
    </Container>
  );
};
