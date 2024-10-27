import styles from "./styles.module.scss";
import Link from "next/link";
import { type TestShortData } from "@/client/redux/features/tests/types";
import { type QueryParams, addQueryParams } from "@/client/utils";
import { pages } from "@/shared/data";
import { type FunctionComponent } from "react";

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
