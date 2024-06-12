import React, { FunctionComponent } from "react";
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

interface Props {
  data: any;
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

const RadarChart: FunctionComponent<Props> = ({ data, className = "" }) => {
  return (
    <ResponsiveContainer className={`${styles.chartContainer} ${className}`}>
      <RechartsRadarChart
        className={styles.radarChart}
        outerRadius={"80%"}
        data={data}
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
          dot={{ r: 4 }}
          className={styles.radarField}
          name="Result"
          dataKey="A"
          fillOpacity={0.4}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
