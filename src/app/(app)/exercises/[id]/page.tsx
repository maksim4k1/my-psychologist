"use client";

import TestsService from "@/api/tests";
import checkAuth from "@/components/hocs/checkAuth";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectGetTestInfoState,
  selectGetTestQuestionsState,
  selectTestInfo,
  selectTestQuestions,
} from "@/redux/features/tests/selectors";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Radio from "@/components/UI/Inputs/Radio";
import Button from "@/components/UI/Buttons/Button";
import ArrowIcon from "@/assets/svg/Icons/ArrowIcon";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { testsActions } from "@/redux/features/tests";

const ExercisePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const testInfo = useAppSelector(selectTestInfo);
  const getTestInfoState = useAppSelector(selectGetTestInfoState);
  const testQuestions = useAppSelector(selectTestQuestions);
  const getTestQuestionsState = useAppSelector(selectGetTestQuestionsState);
  const [currentQuestionNumber, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    dispatch(TestsService.getTestInfo(id));
    dispatch(TestsService.getTestQuestions(id));
  }, [dispatch, id]);

  const selectAnswerHandler = (number: number, score: number) => {
    const newResultsValue = [...results];
    newResultsValue[number - 1] = score;
    setResults(newResultsValue);
  };

  const showQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  useSetDefaultState(testsActions.getTestInfoSetDefaultState);
  useSetDefaultState(testsActions.getTestQuestionsSetDefaultState);

  const currentQuestion = testQuestions && testQuestions[currentQuestionNumber];

  return (
    <Container>
      <StateWrapper state={[getTestInfoState, getTestQuestionsState]}>
        {testInfo && testQuestions && currentQuestion && (
          <>
            <PageTitle className={styles.title}>{testInfo.title}</PageTitle>
            <div className={styles.header}>
              <h4 className={styles.question}>{currentQuestion.title}</h4>
              <div className={styles.questionNumber}>
                {currentQuestionNumber + 1}/{testQuestions.length}
              </div>
            </div>
            <div className={styles.radioButtons}>
              {currentQuestion.answers.map((answer) => {
                return (
                  <Radio
                    key={answer.id}
                    name="question"
                    labelText={answer.text}
                    onClick={() =>
                      selectAnswerHandler(currentQuestion.number, answer.score)
                    }
                  />
                );
              })}
            </div>
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                onClick={() => showQuestion(currentQuestionNumber - 1)}
                disabled={currentQuestionNumber <= 0}
              >
                <ArrowIcon className={styles.backIcon} />
                Предыдущий вопрос
              </Button>
              <Button
                className={styles.button}
                onClick={() => showQuestion(currentQuestionNumber + 1)}
                disabled={currentQuestionNumber + 1 >= testQuestions.length}
              >
                Следующий вопрос
                <ArrowIcon />
              </Button>
            </div>
          </>
        )}
      </StateWrapper>
    </Container>
  );
};

export default checkAuth(ExercisePage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
  ACCESS.client,
]);
