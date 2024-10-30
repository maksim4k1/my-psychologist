interface TestBorderApiData {
  left_border: number;
  right_border: number;
  color: string;
  title: string;
}

interface TestScaleApiData {
  scale_id: string;
  title: string;
  min: number;
  max: number;
  borders: TestBorderApiData[];
}

export interface GetTestApiResponseData {
  test_id: string;
  title: string;
  description: string;
  short_desc: string;
  scales: TestScaleApiData[];
}

interface TestBorderData {
  title: string;
  leftBorder: number;
  rightBorder: number;
  color: string;
}

interface TestScaleData {
  id: string;
  title: string;
  min: number;
  max: number;
  borders: TestBorderData[];
}

export interface GetTestResponseData {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  scales: TestScaleData[];
}
