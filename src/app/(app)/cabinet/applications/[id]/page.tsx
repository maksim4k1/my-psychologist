"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import ApplicationsService from "@/api/applications";
import TestsService from "@/api/tests";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import ProfileCard from "@/components/UI/Cards/ProfileCard";
import TestCard from "@/components/UI/Cards/TestCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { applicationsActions } from "@/redux/features/applications";
import {
  selectApplication,
  selectApplicationState,
  selectConfirmApplicationState,
} from "@/redux/features/applications/selectors";
import { type ApplicationProfileData } from "@/redux/features/applications/types";
import { selectRole } from "@/redux/features/auth/selectors";
import { testsActions } from "@/redux/features/tests";
import {
  selectGetTestsByUserIdState,
  selectTestsByUserId,
} from "@/redux/features/tests/selectors";
import { PopupsService } from "@/redux/services/popups";
import { type StatusState } from "@/utils/stateCreators";
import { useEffect } from "react";

function ApplicationPage() {
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
}

export default checkAuth(ApplicationPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
