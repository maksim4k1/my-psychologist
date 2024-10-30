"use client";

import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { TestsService } from "@/client/api";
import {
  Container,
  GiveExerciseCard,
  HttpErrorWrapper,
  LoadingWrapper,
  PageTitle,
  Subtitle,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
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
