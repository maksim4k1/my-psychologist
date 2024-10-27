"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import ApplicationsService from "@/client/api/applications";
import TestsService from "@/client/api/tests";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/client/components/UI/Buttons/SecondaryButton";
import ProfileCard from "@/client/components/UI/Cards/ProfileCard";
import TestCard from "@/client/components/UI/Cards/TestCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { applicationsActions } from "@/client/redux/features/applications";
import {
  selectApplication,
  selectApplicationState,
  selectConfirmApplicationState,
} from "@/client/redux/features/applications/selectors";
import { type ApplicationProfileData } from "@/client/redux/features/applications/types";
import { selectRole } from "@/client/redux/features/auth/selectors";
import { testsActions } from "@/client/redux/features/tests";
import {
  selectGetTestsByUserIdState,
  selectTestsByUserId,
} from "@/client/redux/features/tests/selectors";
import { PopupsService } from "@/client/redux/services/popups";
import { type StatusState } from "@/client/utils";
import { ACCESS } from "@/shared/config/access.config";
import { type FC, useEffect } from "react";

export const ApplicationPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const role = useAppSelector(selectRole);
  const confirmApplicationState: StatusState = useAppSelector(
    selectConfirmApplicationState,
  );
  const getApplicationState: StatusState = useAppSelector(
    selectApplicationState,
  );
  const application: ApplicationProfileData | null =
    useAppSelector(selectApplication);
  const tests = useAppSelector(selectTestsByUserId);
  const testsState = useAppSelector(selectGetTestsByUserIdState);

  useEffect(() => {
    dispatch(ApplicationsService.getApplication(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (application) {
      dispatch(TestsService.getTestsByUserId(application.userId));
    }
  }, [dispatch, application]);

  useEffect(() => {
    if (confirmApplicationState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Операция успешно выполнена!"),
      );
      router.push("/cabinet");
    }
  }, [confirmApplicationState.isSuccess, dispatch, router]);

  const onClickHandler = (status: boolean) => {
    if (application) {
      dispatch(
        ApplicationsService.confirmApplication(application.userId, status),
      );
    }
  };

  useSetDefaultState(applicationsActions.getApplicationSetDefaultState);
  useSetDefaultState(testsActions.getTestsByUserIdSetDefaultState);

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        <StateWrapper state={[getApplicationState, testsState]}>
          {application && <ProfileCard profile={application} />}
          <div>
            <Subtitle>
              {tests.length ? "Пройденные тесты" : "Нет пройденных тестов"}
            </Subtitle>
            {!!tests.length && application && (
              <div className={styles.tests}>
                {tests.map((el) => {
                  return (
                    <TestCard
                      key={el.id}
                      test={el}
                      params={{ userId: application.userId }}
                    />
                  );
                })}
              </div>
            )}
            {application && (
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
