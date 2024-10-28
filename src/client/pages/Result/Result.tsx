"use client";

import styles from "./styles.module.scss";
import { useParams, useSearchParams } from "next/navigation";
import { TestsService } from "@/client/api";
import RadarChart from "@/client/components/UI/Charts/RadarChart";
import SimpleBarChart from "@/client/components/UI/Charts/SimpleBarChart";
import Container from "@/client/components/UI/Container";
import ListItemWithSwitch from "@/client/components/UI/Lists/ListItemWithSwitch";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useCheckbox, useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { testsActions } from "@/client/redux/features/tests";
import {
  selectGetTestInfoState,
  selectGetTestResultsState,
  selectTestInfo,
  selectTestResults,
} from "@/client/redux/features/tests/selectors";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

export const ResultPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const datesCheckboxes = useCheckbox();
  const dispatch = useAppDispatch();
  const getTestInfoState = useAppSelector(selectGetTestInfoState);
  const getTestResultsState = useAppSelector(selectGetTestResultsState);
  const testInfo = useAppSelector(selectTestInfo);
  const testResults = useAppSelector(selectTestResults);

  useEffect(() => {
    const userId = searchParams.get("userId");
    dispatch(TestsService.getTestInfo(id));
    if (userId) {
      dispatch(TestsService.getTestResults(id, userId));
    } else {
      dispatch(TestsService.getTestResults(id));
    }
  }, [dispatch, id, searchParams]);

  useSetDefaultState(testsActions.getTestInfoSetDefaultState);
  useSetDefaultState(testsActions.getTestResultsSetDefaultState);

  return (
    <Container>
      <StateWrapper state={[getTestInfoState, getTestResultsState]}>
        {testInfo && testResults && (
          <>
            <PageTitle className={styles.title}>
              История теста: {testInfo.title}
            </PageTitle>
            {testResults.length ? (
              <>
                {testInfo.scales.length > 2 ? (
                  <RadarChart
                    results={testResults}
                    scales={testInfo.scales}
                    values={datesCheckboxes.value}
                    className={styles.radarChart}
                  />
                ) : (
                  <SimpleBarChart
                    results={testResults}
                    scales={testInfo.scales}
                    values={datesCheckboxes.value}
                    className={styles.barChart}
                  />
                )}
                <ul>
                  {testResults.map((el) => {
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
      </StateWrapper>
    </Container>
  );
};
