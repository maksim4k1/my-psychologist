"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  ProgressBar,
  Subtitle,
} from "@/client/components";
import { useGetTestResultQuery } from "@/client/redux";
import { type FC } from "react";

export const DetailResultPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: testResult, ...getTestResultState } = useGetTestResultQuery(id);

  if (getTestResultState.isLoading) return <LoadingLoop />;
  if (getTestResultState.isError)
    return <DefaultError error={getTestResultState.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>Результаты теста</PageTitle>
      {testResult && (
        <>
          <Subtitle className={styles.subtitle}>{testResult.title}</Subtitle>
          <div className={styles.results}>
            {testResult.scales.map((el) => {
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
            {testResult.scales.map((el) => {
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
  );
};
