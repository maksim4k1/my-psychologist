"use client";

import styles from "./styles.module.scss";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";
import { type RadarChartItem, mapToRadarChartData } from "@/client/utils";
import {
  type GetTestResponseData,
  type GetTestResultsResponseData,
} from "@/shared/types";
import React, { type FC, useEffect, useState } from "react";

interface Props {
  results: GetTestResultsResponseData;
  scales: GetTestResponseData["scales"];
  values: string[];
  className?: string;
}

interface TextProps {
  payload: { value: string };
  x: number;
  y: number;
  cx: number;
  cy: number;
  [key: string]: any;
}

const TextPolarAngleAxis = ({ payload, x, y, cx, cy, ...rest }: TextProps) => {
  return (
    <Text
      {...rest}
      className={styles.chartText}
      fill="$color-primary"
      verticalAnchor="middle"
      y={y + (y - cy) / 8}
      x={x + (x - cx) / 8}
    >
      {payload.value}
    </Text>
  );
};

export const RadarChart: FC<Props> = ({
  results,
  scales,
  values,
  className = "",
}) => {
  const [radarData, setRadarData] = useState<RadarChartItem[]>([]);

  useEffect(() => {
    if (results && scales) {
      setRadarData(mapToRadarChartData(results, scales, values));
    }
  }, [values, results, scales]);

  const dataSets: string[] = [];

  for (const key in radarData[0]) {
    if (key !== "subject" && key !== "fullMark") {
      dataSets.push(key);
    }
  }

  return (
    <ResponsiveContainer className={`${styles.chartContainer} ${className}`}>
      <RechartsRadarChart
        className={styles.radarChart}
        outerRadius={"80%"}
        data={radarData}
        cx="50%"
        cy="50%"
      >
        <PolarGrid
          radialLines={false}
          gridType="circle"
          className={styles.chartGrid}
        />
        <PolarRadiusAxis
          type="number"
          className={styles.chartAxis}
          tickCount={5}
          angle={90}
          tick={{ className: styles.chartAxisText }}
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={(props) => TextPolarAngleAxis(props)}
        />
        <Tooltip
          labelClassName={styles.tooltipLabel}
          cursor={{ className: styles.tooltipCursor }}
          wrapperClassName={styles.tooltipWrapper}
          formatter={(value, name, payload) => {
            const scale = scales.find(
              (scale) => scale.title === payload.payload.subject,
            );
            if (scale)
              return (
                Math.round(((scale.max - scale.min) / 100) * +value * 10) / 10 +
                scale.min
              );
            return value;
          }}
        />
        <Radar
          dot={{ r: 5 }}
          activeDot={{ className: styles.maxValuesActiveDot, r: 5 }}
          className={styles.maxValues}
          name="Максимальное значение"
          dataKey="fullMark"
          fillOpacity={0}
        />
        {dataSets.map((el) => {
          const res = results.find((res) => res.id === el);
          return (
            <Radar
              key={el}
              dot={{ r: 5, className: styles.dot }}
              activeDot={{ className: styles.activeDot, r: 5 }}
              className={styles.radarField}
              name={res?.datetime ?? "Среднее значение"}
              dataKey={el}
              fillOpacity={0.4}
              label={false}
            />
          );
        })}
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};
