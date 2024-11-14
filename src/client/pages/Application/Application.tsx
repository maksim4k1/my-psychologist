"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import {
  ApplicationProfileCard,
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
  SecondaryButton,
  Subtitle,
  TestCard,
} from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  PopupsService,
  selectRole,
  useConfirmApplicationMutation,
  useGetApplicationQuery,
  useGetUserPassedTestsQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

export const ApplicationPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const role = useAppSelector(selectRole);

  const { data: application, ...getApplicationState } =
    useGetApplicationQuery(id);
  const { data: passedTests, ...getUserPassedTestsState } =
    useGetUserPassedTestsQuery(id);
  const [confirmApplication, confirmApplicationState] =
    useConfirmApplicationMutation();

  useEffect(() => {
    if (confirmApplicationState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Операция успешно выполнена!"),
      );
      router.push(pages.cabinet.path);
    }
  }, [confirmApplicationState.isSuccess, dispatch, router]);

  const onClickHandler = (confirmed: boolean) => {
    if (application) {
      confirmApplication({
        userId: application.userId,
        confirmed,
      });
    }
  };

  if (getApplicationState.isLoading || getUserPassedTestsState.isLoading)
    return <LoadingLoop />;
  if (getApplicationState.isError)
    return <DefaultError error={getApplicationState.error} />;
  if (getUserPassedTestsState.isError)
    return <DefaultError error={getUserPassedTestsState.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        {application && <ApplicationProfileCard profile={application} />}
        <div>
          <Subtitle>
            {!!passedTests && !!passedTests.length
              ? "Пройденные тесты"
              : "Нет пройденных тестов"}
          </Subtitle>
          {!!passedTests && !!passedTests.length && !!application && (
            <div className={styles.tests}>
              {passedTests.map((el) => {
                return (
                  <TestCard
                    key={el.id}
                    test={el}
                    params={{ userId: application?.userId }}
                  />
                );
              })}
            </div>
          )}
          {!!application && (
            <div className={styles.buttons}>
              <PrimaryButton onClick={() => onClickHandler(true)}>
                Принять заявку
              </PrimaryButton>
              <SecondaryButton onClick={() => onClickHandler(false)}>
                Отклонить
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
