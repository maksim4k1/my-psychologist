"use client";

import styles from "./styles.module.scss";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import Subtitle from "@/components/UI/Titles/Subtitle";
import ProgressBar from "@/components/UI/Charts/ProgressBar";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectGetTestInfoState,
  selectGetTestResultState,
  selectTestInfo,
  selectTestResult,
} from "@/redux/features/tests/selectors";
import { useEffect } from "react";
import TestsService from "@/api/tests";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { testsActions } from "@/redux/features/tests";

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

  useSetDefaultState(testsActions.getTestInfoSetDefaultState());
  useSetDefaultState(testsActions.getTestResultSetDefaultState());

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
                      borders={el.borders}
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.descriptionTestContainer}>
              {testInfo.scales.map((el) => {
                const score =
                  testResult.scaleResults.find((res) => res.id === el.id)
                    ?.score ?? 0;

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
]);
