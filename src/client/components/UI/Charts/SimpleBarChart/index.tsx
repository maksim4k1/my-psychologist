"use client";

import styles from "./styles.module.scss";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { type BarChartData, mapToBarChartData } from "@/client/utils";
import {
  type GetTestResponseData,
  type GetTestResultsResponseData,
} from "@/shared/types";
import { type FC, useEffect, useState } from "react";

interface Props {
  results: GetTestResultsResponseData;
  scales: GetTestResponseData["scales"];
  values: string[];
  className?: string;
}

export const SimpleBarChart: FC<Props> = ({
  results,
  scales,
  values,
  className = "",
}) => {
  const [barData, setBarData] = useState<BarChartData>({ data: [], bars: [] });

  useEffect(() => {
    if (results && scales) {
      setBarData(mapToBarChartData(results, scales, values));
    }
  }, [values, results, scales]);

  const primaryColor = "#2E628C";
  const secondaryColor = "#9BCBFA";

  return (
    <ResponsiveContainer className={`${styles.chartContainer} ${className}`}>
      <BarChart
        maxBarSize={100}
        width={500}
        height={300}
        data={barData.data}
      >
        <XAxis dataKey="name" />
        <Legend />
        <Tooltip
          labelClassName={styles.tooltipLabel}
          cursor={{ className: styles.tooltipCursor }}
          wrapperClassName={styles.tooltipWrapper}
        />
        {barData.bars.map((el, index) => {
          return (
            <Bar
              key={el.dataKey}
              dataKey={el.dataKey}
              name={el.name}
              fill={index % 2 === 0 ? primaryColor : secondaryColor}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};
