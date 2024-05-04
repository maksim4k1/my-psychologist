import { FunctionComponent } from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./styles.module.scss";

interface Props {
  data: any;
  className?: string;
}

const RadarChart: FunctionComponent<Props> = ({ data, className = "" }) => {
  return (
    <ResponsiveContainer className={`${styles.chartContainer} ${className}`}>
      <RechartsRadarChart
        className={styles.radarChart}
        outerRadius={"100%"}
        data={data}
        cx="50%"
        cy="60%"
      >
        <PolarGrid className={styles.chartGrid} />
        <PolarRadiusAxis
          className={styles.chartAxis}
          domain={[0, 54]}
          angle={90}
          tick={{ className: styles.chartAxisText }}
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ className: styles.chartText, fill: "$color-primary" }}
        />
        <Radar
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
