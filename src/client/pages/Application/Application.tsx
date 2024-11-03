"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import { TestsService } from "@/client/api";
import {
  ApplicationProfileCard,
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
  SecondaryButton,
  StateWrapper,
  Subtitle,
  TestCard,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
import {
  PopupsService,
  selectGetTestsByUserIdState,
  selectRole,
  selectTestsByUserId,
  testsActions,
  useConfirmApplicationMutation,
  useGetApplicationQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access.config";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

export const ApplicationPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const role = useAppSelector(selectRole);
  const tests = useAppSelector(selectTestsByUserId);
  const testsState = useAppSelector(selectGetTestsByUserIdState);

  const applicationQuery = useGetApplicationQuery(id);
  const [confirmApplication, confirmApplicationMutation] =
    useConfirmApplicationMutation();

  useEffect(() => {
    if (applicationQuery.data) {
      dispatch(TestsService.getTestsByUserId(applicationQuery.data.userId));
    }
  }, [dispatch, applicationQuery.data]);

  useEffect(() => {
    if (confirmApplicationMutation.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Операция успешно выполнена!"),
      );
      router.push(pages.cabinet.path);
    }
  }, [confirmApplicationMutation.isSuccess, dispatch, router]);

  const onClickHandler = (confirmed: boolean) => {
    if (applicationQuery.data) {
      confirmApplication({
        userId: applicationQuery.data.userId,
        confirmed,
      });
    }
  };

  useSetDefaultState(testsActions.getTestsByUserIdSetDefaultState);

  if (applicationQuery.isLoading) return <LoadingLoop />;
  if (applicationQuery.isError)
    return <DefaultError error={applicationQuery.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        <StateWrapper state={[testsState]}>
          {applicationQuery.data && (
            <ApplicationProfileCard profile={applicationQuery.data} />
          )}
          <div>
            <Subtitle>
              {tests.length ? "Пройденные тесты" : "Нет пройденных тестов"}
            </Subtitle>
            {!!tests.length && !!applicationQuery.data && (
              <div className={styles.tests}>
                {tests.map((el) => {
                  return (
                    <TestCard
                      key={el.id}
                      test={el}
                      params={{ userId: applicationQuery.data?.userId }}
                    />
                  );
                })}
              </div>
            )}
            {!!applicationQuery.data && (
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
        </StateWrapper>
      </div>
    </Container>
  );
};
