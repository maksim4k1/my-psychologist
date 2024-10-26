import {
  type ScaleData,
  type ScaleResultData,
  type TestResultData,
} from "@/client/redux/features/tests/types";

export interface RadarChartItem {
  subject: string;
  fullMark: number;
  [key: string]: number | string;
}

export function mapToRadarChartData(
  testResults: TestResultData[],
  scales: ScaleData[],
  values: string[],
): RadarChartItem[] {
  const newData: RadarChartItem[] = [];

  const map: Map<string, ScaleResultData[]> = new Map<
    string,
    ScaleResultData[]
  >();
  for (const { id, scaleResults } of testResults) {
    map.set(id, scaleResults);
  }

  let i: number = 0;
  for (const scale of scales) {
    const subjectData: RadarChartItem = {
      subject: scale.title,
      fullMark: 100,
    };

    if (values.length) {
      for (const testId of values) {
        const scaleResult = map.get(testId);
        if (scaleResult && scaleResult[i]) {
          subjectData[testId] =
            (scaleResult[i].score - scale.min) /
            ((scale.max - scale.min) / 100);
        }
      }
    } else {
      subjectData["summary"] = 0;
      for (const testResult of testResults) {
        const scaleResult = map.get(testResult.id);
        if (scaleResult && scaleResult[i]) {
          subjectData["summary"] += scaleResult[i].score;
        }
      }
      subjectData["summary"] =
        (subjectData["summary"] - scale.min) /
        ((scale.max - scale.min) / 100) /
        testResults.length;
    }
    i++;

    newData.push(subjectData);
  }

  return newData;
}

export interface BarChartData {
  bars: Bar[];
  data: BarChartDataItem[];
}

interface Bar {
  name: string;
  dataKey: string;
}

interface BarChartDataItem {
  name: string;
  [key: string]: any;
}

export function mapToBarChartData(
  testResults: TestResultData[],
  scales: ScaleData[],
  values: string[],
): BarChartData {
  const barChartData: BarChartData = {
    bars: [],
    data: [],
  };

  for (const scale of scales) {
    barChartData.bars.push({
      dataKey: scale.id,
      name: scale.title,
    });
  }

  if (values.length) {
    for (const testResult of testResults) {
      if (!values.includes(testResult.id)) continue;

      const barData: BarChartDataItem = {
        name: testResult.datetime,
      };

      for (const scale of scales) {
        barData[scale.id] = testResult.scaleResults.find(
          (el) => el.id === scale.id,
        )!.score;
      }

      barChartData.data.push(barData);
    }
  } else {
    const barData: BarChartDataItem = {
      name: "Средний результат",
    };
    for (const testResult of testResults) {
      for (const scale of scales) {
        barData[scale.id] =
          (barData[scale.id] ?? 0) +
          testResult.scaleResults.find((el) => el.id === scale.id)!.score;
      }
    }
    for (const key in barData) {
      if (key !== "name") {
        barData[key] =
          Math.round((barData[key] / testResults.length) * 10) / 10;
      }
    }
    barChartData.data.push(barData);
  }

  return barChartData;
}
