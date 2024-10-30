"use client";

import styles from "./styles.module.scss";
import { TestsService } from "@/client/api";
import {
  Container,
  ExerciseCard,
  LoadingWrapper,
  PageTitle,
  Subtitle,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
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
