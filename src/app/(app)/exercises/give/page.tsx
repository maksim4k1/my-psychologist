"use client";

import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import TestsService from "@/api/tests";
import GiveExerciseCard from "@/components/UI/Cards/GiveExerciseCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import HttpErrorWrapper from "@/components/wrappers/HttpErrorWrapper";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { testsActions } from "@/redux/features/tests";
import {
  selectGetTestsState,
  selectGiveTestState,
  selectTests,
} from "@/redux/features/tests/selectors";
import { PopupsService } from "@/redux/services/popups";
import { checkQueryParams } from "@/utils/urlUtils";
import { useEffect } from "react";

function GiveExercisePage() {
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
}

export default checkAuth(GiveExercisePage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
