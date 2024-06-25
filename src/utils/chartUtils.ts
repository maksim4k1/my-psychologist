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
