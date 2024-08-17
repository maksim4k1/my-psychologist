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
  selectSendTestResultState,
  selectTestInfo,
  selectTestQuestions,
} from "@/redux/features/tests/selectors";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Radio from "@/components/UI/Inputs/Radio";
import Button from "@/components/UI/Buttons/Button";
import ArrowIcon from "@/assets/svg/Icons/ArrowIcon";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { testsActions } from "@/redux/features/tests";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import { PopupsService } from "@/redux/services/popups";

const ExercisePage: FC = () => {
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
      showQuestion(number);
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

export default checkAuth(ExercisePage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
  ACCESS.client,
]);
