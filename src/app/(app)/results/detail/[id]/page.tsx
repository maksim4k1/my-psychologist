"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import TestsService from "@/client/api/tests";
import ProgressBar from "@/client/components/UI/Charts/ProgressBar";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import checkAuth from "@/client/components/hocs/checkAuth";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { testsActions } from "@/client/redux/features/tests";
import {
  selectGetTestInfoState,
  selectGetTestResultState,
  selectTestInfo,
  selectTestResult,
} from "@/client/redux/features/tests/selectors";
import { ACCESS } from "@/shared/config/access.config";
import { useEffect } from "react";

function DetailResultPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const getTestInfoState = useAppSelector(selectGetTestInfoState);
  const testInfo = useAppSelector(selectTestInfo);
  const getTestResultState = useAppSelector(selectGetTestResultState);
  const testResult = useAppSelector(selectTestResult);

  useEffect(() => {
    dispatch(TestsService.getTestResult(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (getTestResultState.isSuccess && testResult) {
      dispatch(TestsService.getTestInfo(testResult.testId));
    }
  }, [getTestResultState.isSuccess, dispatch, testResult]);

  useSetDefaultState(testsActions.getTestInfoSetDefaultState);
  useSetDefaultState(testsActions.getTestResultSetDefaultState);

  return (
    <StateWrapper state={[getTestResultState, getTestInfoState]}>
      <Container>
        <PageTitle className={styles.title}>Результаты теста</PageTitle>
        {testInfo && testResult && (
          <>
            <Subtitle className={styles.subtitle}>{testInfo.title}</Subtitle>
            <div className={styles.results}>
              {testInfo.scales.map((el) => {
                return (
                  <div
                    className={styles.result}
                    key={el.id}
                  >
                    <h4 className={styles.resultTitle}>{el.title}</h4>
                    <ProgressBar
                      className={styles.scale}
                      value={
                        testResult.scaleResults.find((res) => res.id === el.id)
                          ?.score ?? 0
                      }
                      max={el.max}
                      min={el.min}
                      borders={el.borders}
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.descriptionTestContainer}>
              {testInfo.scales.map((el) => {
                const scale = testResult.scaleResults.find(
                  (res) => res.id === el.id,
                );
                const score = scale?.score ?? 0;

                const border = el.borders.find(
                  (el) => score >= el.leftBorder && score <= el.rightBorder,
                );

                return (
                  <div
                    className={styles.descriptionTextContainer}
                    key={el.id}
                  >
                    <h3 className={styles.descriptionTitle}>
                      {el.title} —{" "}
                      {border && (
                        <span style={{ color: border.color }}>
                          {score} ({border.title})
                        </span>
                      )}
                    </h3>
                    <p className={styles.descriptionText}>
                      {scale?.recomendations}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </StateWrapper>
  );
}

export default checkAuth(DetailResultPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
  ACCESS.client,
]);
