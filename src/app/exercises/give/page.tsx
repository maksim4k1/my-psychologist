"use client";

import checkAuth from "@/components/hocs/checkAuth";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import Subtitle from "@/components/UI/Titles/Subtitle";
import { ACCESS } from "../../../../config/access.config";
import { TestData } from "@/redux/features/tests/types";
import { useSearchParams } from "next/navigation";
import ExerciseCard from "@/components/UI/Cards/ExerciseCard";

function GiveExercisesPage() {
  const searchParams = useSearchParams();

  const tests: TestData[] = [
    {
      id: "1",
      title: "Тест на депрессию",
      description:
        "Тест по методике знаменитого американского психотерапевта Аарона Бека",
    },
    {
      id: "2",
      title: "Индикатор копинг-стратегий",
      description:
        "Предназначен для диагностики доминирующих копинг-стратегий личности",
    },
    {
      id: "3",
      title: "Профессиональное выгорание",
      description:
        "Предназначен для измерения основных показателей синдрома профессионального выгорания",
    },
    {
      id: "4",
      title: "Шкала тревоги",
      description:
        "Тест определяет уровень тревожности исходя из шкалы самооценки.",
    },
    {
      id: "5",
      title: "Шкала депрессии, тревоги и стресса",
      description:
        "Является одной из наиболее распространенных современных шкал психологического дискомфорта.",
    },
  ];

  return (
    <Container>
      <PageTitle>Задания для клиента</PageTitle>
      <div className={styles.section}>
        <Subtitle>Тесты</Subtitle>
        <div className={styles.list}>
          {tests.map((test) => {
            return (
              <ExerciseCard
                key={test.id}
                id={test.id}
                title={test.title}
                description={test.description}
                userId={searchParams.get("userId") ?? ""}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default checkAuth(GiveExercisesPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
