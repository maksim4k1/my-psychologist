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

function DetailResultPage() {
  const { id } = useParams();
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
                return (
                  <div
                    className={styles.descriptionTextContainer}
                    key={el.id}
                  >
                    <h3 className={styles.descriptionTitle}>
                      {el.title} —{" "}
                      {testResult.scaleResults.find((res) => res.id === el.id)
                        ?.score ?? 0}
                    </h3>
                    <p className={styles.descriptionText}>
                      Эмоциональное истощение рассматривается как основная
                      составляющая выгорания и проявляется в переживаниях
                      сниженного эмоционального тонуса, повышенной психической
                      истощаемости и аффективной лабильности, утраты интереса и
                      позитивных чувств к окружающим, ощущении «пресыщенности»
                      работой, неудовлетворенностью жизнью в целом.
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
]);
