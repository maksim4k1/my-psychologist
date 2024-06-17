"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import { useParams, useRouter } from "next/navigation";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import TestCard from "@/components/UI/Cards/TestCard";
import ProfileCard from "@/components/UI/Cards/ProfileCard";
import { ApplicationProfileData } from "@/redux/features/applications/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectApplication,
  selectApplicationState,
  selectConfirmApplicationState,
} from "@/redux/features/applications/selectors";
import { useEffect } from "react";
import ApplicationsService from "@/api/applications";
import { StatusState } from "@/utils/stateCreators";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";

function ApplicationPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const confirmApplicationState: StatusState = useAppSelector(
    selectConfirmApplicationState,
  );
  const getApplicationState: StatusState = useAppSelector(
    selectApplicationState,
  );
  const application: ApplicationProfileData | null =
    useAppSelector(selectApplication);

  useEffect(() => {
    dispatch(ApplicationsService.getApplication(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (confirmApplicationState.isSuccess) {
      router.push("/cabinet");
    }
  }, [confirmApplicationState.isSuccess, router]);

  const onClickHandler = (status: boolean) => {
    if (application) {
      dispatch(
        ApplicationsService.confirmApplication(application.userId, status),
      );
    }
  };

  return (
    <Container>
      <PageTitle className={styles.title}>Профиль клиента</PageTitle>
      <div className={styles.main}>
        <LoadingWrapper status={getApplicationState.isLoading}>
          {application && <ProfileCard profile={application} />}
          <div>
            <Subtitle>Пройденные тесты</Subtitle>
            <div className={styles.tests}>
              <TestCard
                test={{
                  id: 1,
                  title: "Профессиональное выгорание",
                }}
              />
              <TestCard
                test={{
                  id: 2,
                  title: "Шкала депрессии, тревоги и стресса",
                }}
              />
              <TestCard
                test={{
                  id: 3,
                  title: "Шкала тревоги Спилбергера-Ханина",
                }}
              />
            </div>
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
        </LoadingWrapper>
      </div>
    </Container>
  );
}

export default checkAuth(ApplicationPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
