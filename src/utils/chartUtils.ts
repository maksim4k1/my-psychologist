import {
  ScaleData,
  ScaleResultData,
  TestResultData,
} from "@/redux/features/tests/types";

export interface RadarChartItem {
  subject: string;
  fullMark: number;
  [key: string]: any;
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
  for (let { id, scaleResults } of testResults) {
    map.set(id, scaleResults);
  }

  let i: number = 0;
  for (let scale of scales) {
    const subjectData: RadarChartItem = {
      subject: scale.title,
      fullMark: scale.max,
    };

    if (values.length) {
      for (let testId of values) {
        const scaleResult = map.get(testId);
        if (scaleResult && scaleResult[i]) {
          subjectData[testId] = scaleResult[i].score;
        }
      }
    } else {
      subjectData["summary"] = 0;
      for (let testResult of testResults) {
        const scaleResult = map.get(testResult.id);
        if (scaleResult && scaleResult[i]) {
          subjectData["summary"] += scaleResult[i].score;
        }
      }
      subjectData["summary"] /= testResults.length;
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

  for (let scale of scales) {
    barChartData.bars.push({
      dataKey: scale.id,
      name: scale.title,
    });
  }

  if (values.length) {
    for (let testResult of testResults) {
      if (!values.includes(testResult.id)) continue;

      const barData: BarChartDataItem = {
        name: testResult.datetime,
      };

      for (let scale of scales) {
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
    for (let testResult of testResults) {
      for (let scale of scales) {
        barData[scale.id] =
          (barData[scale.id] ?? 0) +
          testResult.scaleResults.find((el) => el.id === scale.id)!.score;
      }
    }
    for (let key in barData) {
      if (key !== "name") {
        barData[key] /= testResults.length;
      }
    }
    barChartData.data.push(barData);
  }

  return barChartData;
}
