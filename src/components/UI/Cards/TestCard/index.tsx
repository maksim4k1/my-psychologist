import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

interface TestProps {
  test: {
    id: number;
    title: string;
  };
}

const TestCard: FunctionComponent<TestProps> = ({ test }) => {
  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{test.title}</div>
      <Link
        className={styles.testLink}
        href={`/psychologist/clients/result/overall`}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};

export default TestCard;
