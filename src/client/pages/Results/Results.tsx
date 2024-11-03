"use client";

import styles from "./styles.module.scss";
import { useParams, useSearchParams } from "next/navigation";
import {
  Container,
  DefaultError,
  ListItemWithSwitch,
  LoadingLoop,
  PageTitle,
  RadarChart,
  SimpleBarChart,
} from "@/client/components";
import { useCheckbox } from "@/client/hooks";
import { useGetTestResultsQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ResultsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const datesCheckboxes = useCheckbox();

  const { data: test, ...getTestResultsState } = useGetTestResultsQuery({
    testId: id,
    userId: searchParams.get("userId"),
  });

  if (getTestResultsState.isLoading) return <LoadingLoop />;
  if (getTestResultsState.isError)
    return <DefaultError error={getTestResultsState.error} />;

  return (
    <Container>
      {test && (
        <>
          <PageTitle className={styles.title}>
            История теста: {test.title}
          </PageTitle>
          {test.results.length ? (
            <>
              {test.scales.length > 2 ? (
                <RadarChart
                  results={test.results}
                  scales={test.scales}
                  values={datesCheckboxes.value}
                  className={styles.radarChart}
                />
              ) : (
                <SimpleBarChart
                  results={test.results}
                  scales={test.scales}
                  values={datesCheckboxes.value}
                  className={styles.barChart}
                />
              )}
              <ul>
                {test.results.map((el) => {
                  return (
                    <ListItemWithSwitch
                      onChange={datesCheckboxes.onChange}
                      className={styles.listItem}
                      value={el.id}
                      key={el.id}
                      label={el.datetime}
                      link={pages.detailResult.getLink({
                        params: { id: el.id },
                      })}
                    />
                  );
                })}
              </ul>
            </>
          ) : (
            <div className={styles.errorLabel}>
              Отсутствует история прохождения теста
            </div>
          )}
        </>
      )}
    </Container>
  );
};
