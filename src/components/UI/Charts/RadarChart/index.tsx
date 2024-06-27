"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Text,
} from "recharts";
import styles from "./styles.module.scss";
import { RadarChartItem, mapToRadarChartData } from "@/utils/chartUtils";
import { ScaleData, TestResultData } from "@/redux/features/tests/types";

interface Props {
  results: TestResultData[];
  scales: ScaleData[];
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

const RadarChart: FunctionComponent<Props> = ({
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

  const dataSets = [];

  for (let key in radarData[0]) {
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
        <Radar
          isAnimationActive={false}
          dot={{ r: 5 }}
          className={styles.maxValues}
          name="fullMark"
          dataKey="fullMark"
          fillOpacity={0}
        />
        {dataSets.map((el) => {
          return (
            <Radar
              isAnimationActive={false}
              key={el}
              dot={{ r: 5, className: styles.point }}
              className={styles.radarField}
              name={el}
              dataKey={el}
              fillOpacity={0.4}
            />
          );
        })}
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
