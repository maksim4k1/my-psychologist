export interface RadarChartItem {
  subject: string;
  fullMark: number;
  [key: string]: any;
}

export interface DateData {
  date: string;
  values: number[];
}

export function mapToRadarChartData(
  dates: DateData[],
  subjects: RadarChartItem[],
  values: string[],
): RadarChartItem[] {
  const newData: RadarChartItem[] = [];

  const map: Map<string, number[]> = new Map<string, number[]>();
  for (let { date, values } of dates) {
    map.set(date, values);
  }

  let i = 0;
  for (let subject of subjects) {
    const subjectData: RadarChartItem = { ...subject };
    if (values.length) {
      for (let date of values) {
        subjectData[date] = map.get(date)![i];
      }
    } else {
      let sum = 0;
      for (let { values } of dates) {
        sum += values[i];
      }
      subjectData["A"] = sum / dates.length;
    }
    newData.push(subjectData);
    i++;
  }

  return newData;
}
