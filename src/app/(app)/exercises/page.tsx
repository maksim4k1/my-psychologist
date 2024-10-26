"use client";

import styles from "./styles.module.scss";
import TestsService from "@/client/api/tests";
import ExerciseCard from "@/client/components/UI/Cards/ExerciseCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import checkAuth from "@/client/components/hocs/checkAuth";
import LoadingWrapper from "@/client/components/wrappers/LoadingWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { testsActions } from "@/client/redux/features/tests";
import {
  selectGetTestsState,
  selectTests,
} from "@/client/redux/features/tests/selectors";
import { ACCESS } from "@/shared/config/access.config";
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
