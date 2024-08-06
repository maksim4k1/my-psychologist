"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import Subtitle from "@/components/UI/Titles/Subtitle";
import ExerciseCard from "@/components/UI/Cards/ExerciseCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectGetTestsState,
  selectTests,
} from "@/redux/features/tests/selectors";
import TestsService from "@/api/tests";
import { useEffect } from "react";
import { testsActions } from "@/redux/features/tests";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";

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
