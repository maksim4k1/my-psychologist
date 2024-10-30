"use client";

import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { TestsService } from "@/client/api";
import GiveExerciseCard from "@/client/components/UI/Cards/GiveExerciseCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import HttpErrorWrapper from "@/client/components/wrappers/HttpErrorWrapper";
import LoadingWrapper from "@/client/components/wrappers/LoadingWrapper";
import { useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import {
  PopupsService,
  selectGetTestsState,
  selectGiveTestState,
  selectTests,
  testsActions,
} from "@/client/redux";
import { checkQueryParams } from "@/client/utils";
import { type FC, useEffect } from "react";

export const GiveExercisePage: FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);
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
      dispatch(testsActions.giveTestSetDefaultState());
    }
  }, [giveTestState.isSuccess, dispatch]);

  useSetDefaultState(testsActions.getTestsSetDefaultState);

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
              {tests.length ? "Тесты" : "Нет доступных тестов"}
            </Subtitle>
            {!!tests.length && (
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
          </LoadingWrapper>
        </div>
      </Container>
    </HttpErrorWrapper>
  );
};
