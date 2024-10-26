"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import TestsService from "@/client/api/tests";
import ArrowIcon from "@/client/assets/svg/Icons/ArrowIcon";
import Button from "@/client/components/UI/Buttons/Button";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import Radio from "@/client/components/UI/Inputs/Radio";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { testsActions } from "@/client/redux/features/tests";
import {
  selectGetTestInfoState,
  selectGetTestQuestionsState,
  selectSendTestResultState,
  selectTestInfo,
  selectTestQuestions,
} from "@/client/redux/features/tests/selectors";
import { PopupsService } from "@/client/redux/services/popups";
import { type FC, useEffect, useState } from "react";

export const ExercisePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const testInfo = useAppSelector(selectTestInfo);
  const getTestInfoState = useAppSelector(selectGetTestInfoState);
  const testQuestions = useAppSelector(selectTestQuestions);
  const getTestQuestionsState = useAppSelector(selectGetTestQuestionsState);
  const sendTestResultState = useAppSelector(selectSendTestResultState);
  const [currentQuestionNumber, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    dispatch(TestsService.getTestInfo(id));
    dispatch(TestsService.getTestQuestions(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (sendTestResultState.isSuccess) {
      router.push(`/results/${id}`);
      dispatch(PopupsService.openSnackbarWithDelay("Тест успешно пройден!"));
    }
  }, [sendTestResultState.isSuccess, dispatch, id, router]);

  const selectAnswerHandler = (number: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[number - 1] = score;
    setAnswers(newAnswers);

    if (number >= answers.length && number !== testQuestions?.length) {
      setTimeout(() => showQuestion(number), 500);
    }
  };

  const showQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const sendTestResult = () => {
    dispatch(TestsService.sendTestResult(id, answers));
  };

  useSetDefaultState(testsActions.getTestInfoSetDefaultState);
  useSetDefaultState(testsActions.getTestQuestionsSetDefaultState);
  useSetDefaultState(testsActions.sendTestResultSetDefaultState);

  const currentQuestion = testQuestions && testQuestions[currentQuestionNumber];

  const isSendButtonDisabled = !(
    answers.reduce((acc, ans) => {
      return !!(acc && typeof ans === "number");
    }, true) && answers.length === testQuestions?.length
  );

  return (
    <Container>
      <StateWrapper
        state={[getTestInfoState, getTestQuestionsState, sendTestResultState]}
      >
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
                    defaultChecked={
                      answers[currentQuestion.number - 1] === answer.score
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
              <PrimaryButton
                disabled={isSendButtonDisabled}
                onClick={sendTestResult}
              >
                Закончить тест
              </PrimaryButton>
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
