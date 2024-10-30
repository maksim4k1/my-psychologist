import styles from "./styles.module.scss";
import Link from "next/link";
import { type QueryParams, addQueryParams } from "@/client/utils";
import { pages } from "@/shared/data";
import { type GetTestsResponseData } from "@/shared/types";
import { type FC } from "react";

interface TestProps {
  test: GetTestsResponseData[number];
  params?: QueryParams;
}

const TestCard: FC<TestProps> = ({ test, params = undefined }) => {
  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{test.title}</div>
      <Link
        className={styles.testLink}
        href={addQueryParams(
          pages.result.getLink({ params: { id: test.id } }),
          params,
        )}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};

export default TestCard;
