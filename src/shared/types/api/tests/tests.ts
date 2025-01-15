export type GetTestsApiResponseData = {
  test_id: string;
  title: string;
  description: string;
  short_desc: string;
  link_to_picture: string;
}[];

export type GetTestsResponseData = {
  id: string;
  title: string;
  description: string;
  image: string;
}[];
