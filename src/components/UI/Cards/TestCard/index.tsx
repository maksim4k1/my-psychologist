import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { TestData } from "@/redux/features/tests/types";

interface TestProps {
  test: TestData;
}

const TestCard: FunctionComponent<TestProps> = ({ test }) => {
  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{test.title}</div>
      <Link
        className={styles.testLink}
        href={`/results/${test.id}`}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};

export default TestCard;
