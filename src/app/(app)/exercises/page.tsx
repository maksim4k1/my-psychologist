"use client";

import styles from "./styles.module.scss";
import TestsService from "@/api/tests";
import ExerciseCard from "@/components/UI/Cards/ExerciseCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { testsActions } from "@/redux/features/tests";
import {
  selectGetTestsState,
  selectTests,
} from "@/redux/features/tests/selectors";
import { useEffect } from "react";

function ExercisesPage() {
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
}

export default checkAuth(ExercisesPage, true, [
  ACCESS.client,
  ACCESS.psychologist,
  ACCESS.hr,
]);
