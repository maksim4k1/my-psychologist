"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import { ArrowIcon } from "@/client/assets/icons";
import {
  Button,
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
  Radio,
} from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import {
  PopupsService,
  useGetTestQuestionsQuery,
  useSendTestResultMutation,
} from "@/client/redux";
import { pages } from "@/shared/data";
import { type FC, useEffect, useState } from "react";

export const ExercisePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentQuestionNumber, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const { data: test, ...getTestState } = useGetTestQuestionsQuery(id);
  const [sendTestResult, sendTestResultState] = useSendTestResultMutation();

  useEffect(() => {
    if (sendTestResultState.isSuccess) {
      router.push(pages.result.getLink({ params: { id } }));
      dispatch(PopupsService.openSnackbarWithDelay("Тест успешно пройден!"));
    }
  }, [sendTestResultState.isSuccess, dispatch, id, router]);

  const selectAnswerHandler = (number: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[number - 1] = score;
    setAnswers(newAnswers);

    if (number >= answers.length && number !== test?.questions.length) {
      setTimeout(() => showQuestion(number), 500);
    }
  };

  const showQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const sendTestResultHandler = () => {
    sendTestResult({
      testId: id,
      answers,
    });
  };

  const currentQuestion = test && test.questions[currentQuestionNumber];

  const isSendButtonDisabled = !(
    answers.reduce((acc, ans) => {
      return !!(acc && typeof ans === "number");
    }, true) && answers.length === test?.questions.length
  );

  if (getTestState.isLoading || sendTestResultState.isLoading)
    return <LoadingLoop />;
  if (getTestState.isError) return <DefaultError error={getTestState.error} />;
  if (sendTestResultState.isError)
    return <DefaultError error={sendTestResultState.error} />;

  return (
    <Container>
      {test && currentQuestion && (
        <>
          <PageTitle className={styles.title}>{test.title}</PageTitle>
          <div className={styles.header}>
            <h4 className={styles.question}>{currentQuestion.title}</h4>
            <div className={styles.questionNumber}>
              {currentQuestionNumber + 1}/{test.questions.length}
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
              onClick={sendTestResultHandler}
            >
              Закончить тест
            </PrimaryButton>
            <Button
              className={styles.button}
              onClick={() => showQuestion(currentQuestionNumber + 1)}
              disabled={currentQuestionNumber + 1 >= test.questions.length}
            >
              Следующий вопрос
              <ArrowIcon />
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};
