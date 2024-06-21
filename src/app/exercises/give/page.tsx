"use client";

import checkAuth from "@/components/hocs/checkAuth";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import Subtitle from "@/components/UI/Titles/Subtitle";
import { ACCESS } from "../../../../config/access.config";
import { TestData } from "@/redux/features/tests/types";
import { useSearchParams } from "next/navigation";
import ExerciseCard from "@/components/UI/Cards/ExerciseCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectGetTestsState,
  selectGiveTestState,
  selectTests,
} from "@/redux/features/tests/selectors";
import { useEffect } from "react";
import TestsService from "@/api/tests";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import { testsActions } from "@/redux/features/tests";
import HttpErrorWrapper from "@/components/wrappers/HttpErrorWrapper";
import { checkQueryParams } from "@/utils/urlUtils";
import { PopupsService } from "@/redux/services/popups";

function GiveExercisePage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const tests: TestData[] = useAppSelector(selectTests);
  const testsState = useAppSelector(selectGetTestsState);
  const giveTestState = useAppSelector(selectGiveTestState);

  useEffect(() => {
    dispatch(TestsService.getTests());
  }, [dispatch]);

  useEffect(() => {
    if (giveTestState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Задание успешно назначено!"),
      );
      dispatch(testsActions.giveTestStateDefault());
    }
  }, [giveTestState.isSuccess, dispatch]);

  return (
    <HttpErrorWrapper
      status={checkQueryParams(searchParams, true, "userId")}
      error={{ status: 400, message: "" }}
    >
      <Container>
        <PageTitle>Задания для клиента</PageTitle>
        <div className={styles.section}>
          <LoadingWrapper status={testsState.isLoading}>
            <Subtitle>
              {!!tests.length ? "Тесты" : "Нет доступных тестов"}
            </Subtitle>
            {!!tests.length && (
              <div className={styles.list}>
                {tests.map((test) => {
                  return (
                    <ExerciseCard
                      key={test.id}
                      exercise={test}
                      userId={searchParams.get("userId") ?? ""}
                    />
                  );
                })}
              </div>
            )}
          </LoadingWrapper>
        </div>
      </Container>
    </HttpErrorWrapper>
  );
}

export default checkAuth(GiveExercisePage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
