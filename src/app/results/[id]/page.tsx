"use client";

import styles from "./styles.module.scss";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import RadarChart from "@/components/UI/Charts/RadarChart";
import ListItemWithSwitch from "@/components/UI/Lists/ListItemWithSwitch";
import { useCheckbox } from "@/hooks/inputHooks";
import { useEffect, useState } from "react";
import { RadarChartItem, mapToRadarChartData } from "@/utils/chartUtils";
import { ACCESS } from "../../../../config/access.config";
import { useParams, useSearchParams } from "next/navigation";
import { checkQueryParams } from "@/utils/urlUtils";
import HttpErrorWrapper from "@/components/wrappers/HttpErrorWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import TestsService from "@/api/tests";
import StateWrapper from "@/components/wrappers/StateWrapper";
import {
  selectGetTestInfoState,
  selectGetTestResultsState,
  selectTestInfo,
  selectTestResults,
} from "@/redux/features/tests/selectors";

function ResultPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const datesCheckboxes = useCheckbox();
  const [data, setData] = useState<RadarChartItem[]>([]);
  const dispatch = useAppDispatch();
  const getTestInfoState = useAppSelector(selectGetTestInfoState);
  const getTestResultsState = useAppSelector(selectGetTestResultsState);
  const testInfo = useAppSelector(selectTestInfo);
  const testResults = useAppSelector(selectTestResults);

  useEffect(() => {
    dispatch(TestsService.getTestInfo(id));
    dispatch(TestsService.getTestResults(id, searchParams.get("userId")));
  }, [dispatch, id, searchParams]);

  useEffect(() => {
    if (testResults && testInfo) {
      setData(
        mapToRadarChartData(
          testResults,
          testInfo.scales,
          datesCheckboxes.value,
        ),
      );
    }
  }, [datesCheckboxes.value, testResults, testInfo]);

  return (
    <HttpErrorWrapper
      status={checkQueryParams(searchParams, true, "userId")}
      error={{ status: 400, message: "" }}
    >
      <Container>
        <StateWrapper state={[getTestInfoState, getTestResultsState]}>
          {testInfo && testResults && (
            <>
              <PageTitle className={styles.title}>
                История теста: {testInfo.title}
              </PageTitle>
              <RadarChart
                data={data}
                className={styles.radarChart}
              />
              <ul>
                {testResults.map((el) => {
                  return (
                    <ListItemWithSwitch
                      onChange={datesCheckboxes.onChange}
                      className={styles.listItem}
                      value={el.id}
                      key={el.id}
                      label={el.datetime}
                      link={`/results/detail/${el.id}`}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </StateWrapper>
      </Container>
    </HttpErrorWrapper>
  );
}

export default checkAuth(ResultPage, true, [ACCESS.psychologist, ACCESS.hr]);
