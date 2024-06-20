"use client";

import checkAuth from "@/components/hocs/checkAuth";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import Subtitle from "@/components/UI/Titles/Subtitle";
import { FunctionComponent } from "react";
import { ACCESS } from "../../../../config/access.config";

interface Props {
  title: string;
  description: string;
}

const ExerciseCard: FunctionComponent<Props> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

interface TaskInfo {
  title: string;
  description: string;
}

function GiveExercisesPage() {
  const tests: TaskInfo[] = [
    {
      title: "Тест на депрессию",
      description:
        "Тест по методике знаменитого американского психотерапевта Аарона Бека",
    },
    {
      title: "Индикатор копинг-стратегий",
      description:
        "Предназначен для диагностики доминирующих копинг-стратегий личности",
    },
    {
      title: "Профессиональное выгорание",
      description:
        "Предназначен для измерения основных показателей синдрома профессионального выгорания",
    },
    {
      title: "Шкала тревоги",
      description:
        "Тест определяет уровень тревожности исходя из шкалы самооценки.",
    },
    {
      title: "Шкала депрессии, тревоги и стресса",
      description:
        "Является одной из наиболее распространенных современных шкал психологического дискомфорта.",
    },
  ];

  const tasks: TaskInfo[] = [
    {
      title: "Трекер настроения",
      description:
        "Отмечай своё настроение каждый день, чтобы быть в курсе своего состояния и отслеживать его!",
    },
    {
      title: "Дневник мыслей",
      description:
        "Расскажи, как прошёл твой день или что тебя тревожит. Дневник сохранит всё в тайне:)",
    },
  ];
  const learning: TaskInfo[] = [
    {
      title: "Анализ убеждений",
      description:
        "Давай поработаем на твоими убеждениями и попробуем изменить их",
    },
    {
      title: "Проверка убеждений",
      description:
        "Иногда необходимо рефлексировать и обдумывать то, что направляет тебя каждый день.",
    },
    {
      title: "Анализ проблемы",
      description:
        "Ты обязательно справишься с любой своей проблемой, а мы поможем сделать это экологично!",
    },
    {
      title: "P- и диалог",
      description:
        "У дизайнера кончились идеи на придумывание текста для заданий. Тут диалог:)",
    },
  ];

  return (
    <Container>
      <PageTitle>Задания для клиента</PageTitle>
      <div className={styles.section}>
        <Subtitle>Тесты</Subtitle>
        <div className={styles.list}>
          {tests.map((test, index) => {
            return (
              <ExerciseCard
                key={index}
                title={test.title}
                description={test.description}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <Subtitle>Задания</Subtitle>
        <div className={styles.list}>
          {tasks.map((task, index) => {
            return (
              <ExerciseCard
                key={index}
                title={task.title}
                description={task.description}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <Subtitle>Психообразование</Subtitle>
        <div className={styles.list}>
          {learning.map((learning, index) => {
            return (
              <ExerciseCard
                key={index}
                title={learning.title}
                description={learning.description}
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
