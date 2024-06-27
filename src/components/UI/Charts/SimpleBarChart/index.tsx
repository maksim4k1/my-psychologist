import { FunctionComponent, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import styles from "./styles.module.scss";
import { BarChartData, mapToBarChartData } from "@/utils/chartUtils";
import { ScaleData, TestResultData } from "@/redux/features/tests/types";

interface Props {
  results: TestResultData[];
  scales: ScaleData[];
  values: string[];
  className?: string;
}

const SimpleBarChart: FunctionComponent<Props> = ({
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
          cursor={{ fill: "rgb(224, 226, 232)" }}
          wrapperClassName={styles.tooltipWrapper}
        />
        {barData.bars.map((el, index) => {
          return (
            <Bar
              key={el.dataKey}
              dataKey={el.dataKey}
              name={el.name}
              fill={index % 2 === 0 ? "#2E628C" : "#9BCBFA"}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
