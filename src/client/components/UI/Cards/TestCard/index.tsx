import styles from "./styles.module.scss";
import Link from "next/link";
import { pages } from "@/shared/data";
import { type GetTestsResponseData } from "@/shared/types";
import { type FC } from "react";

interface TestProps {
  test: GetTestsResponseData[number];
  params?: {
    [key: string]: string;
  };
}

export const TestCard: FC<TestProps> = ({ test, params = undefined }) => {
  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{test.title}</div>
      <Link
        className={styles.testLink}
        href={pages.result.getLink({
          params: { id: test.id },
          queryParams: params,
        })}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};
