import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { TestShortData } from "@/redux/features/tests/types";
import { QueryParams, addQueryParams } from "@/utils/urlUtils";

interface TestProps {
  test: TestShortData;
  params?: QueryParams;
}

const TestCard: FunctionComponent<TestProps> = ({
  test,
  params = undefined,
}) => {
  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{test.title}</div>
      <Link
        className={styles.testLink}
        href={addQueryParams(`/results/${test.id}`, params)}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};

export default TestCard;
