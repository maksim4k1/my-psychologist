"use client";

import styles from "./styles.module.scss";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../../config/access.config";
import RadarChart from "@/components/UI/Charts/RadarChart";
import ListItemWithSwitch from "@/components/UI/Lists/ListItemWithSwitch";
import { useCheckbox } from "@/hooks/inputHooks";
import { useEffect, useState } from "react";
import {
  DateData,
  RadarChartItem,
  mapToRadarChartData,
} from "@/utils/chartUtils";

const dates: DateData[] = [
  {
    date: "15 апреля",
    values: [34, 20, 17],
  },
  {
    date: "8 мая",
    values: [15, 35, 25],
  },
  {
    date: "18 марта",
    values: [45, 32, 20],
  },
  {
    date: "12 февраля",
    values: [46, 28, 25],
  },
  {
    date: "12 января",
    values: [15, 15, 15],
  },
  {
    date: "5 декабря 2023 года",
    values: [24, 20, 23],
  },
  {
    date: "2  ноября 2023 года",
    values: [12, 2, 10],
  },
];

const subjects: RadarChartItem[] = [
  {
    subject: "Эмоциональное истощение",
    fullMark: 54,
  },
  {
    subject: "Редукция проф. достижений",
    fullMark: 40,
  },
  {
    subject: "Деперсонализация",
    fullMark: 30,
  },
];

function PsychologistClientsOverallResultPage() {
  const datesCheckboxes = useCheckbox();
  const [data, setData] = useState<RadarChartItem[]>([]);

  useEffect(() => {
    setData(mapToRadarChartData(dates, subjects, datesCheckboxes.value));
  }, [datesCheckboxes.value]);

  return (
    <Container>
      <PageTitle className={styles.title}>История теста: Маслач</PageTitle>
      <RadarChart
        data={data}
        className={styles.radarChart}
      />
      <ul>
        {dates.map((el) => {
          return (
            <ListItemWithSwitch
              onChange={datesCheckboxes.onChange}
              className={styles.listItem}
              value={el.date}
              key={el.date}
              label={el.date}
              link="./"
            />
          );
        })}
      </ul>
    </Container>
  );
}

export default checkAuth(PsychologistClientsOverallResultPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
