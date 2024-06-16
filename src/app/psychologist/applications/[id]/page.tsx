"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import { useParams } from "next/navigation";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import TestCard from "@/components/UI/Cards/TestCard";
import ProfileCard from "@/components/UI/Cards/ProfileCard";
import { ApplicationProfileData } from "@/redux/features/applications/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectApplication,
  selectApplicationState,
} from "@/redux/features/applications/selectors";
import { useEffect } from "react";
import ApplicationsService from "@/api/applications";
import { StatusState } from "@/utils/stateCreators";

function ApplicationPage() {
  const { id } = useParams();
  const getApplicationState: StatusState = useAppSelector(
    selectApplicationState,
  );
  const application: ApplicationProfileData | null =
    useAppSelector(selectApplication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ApplicationsService.getApplication(id));
  }, [id]);

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
            <div className={styles.buttons}>
              {/* <PrimaryButton href="./result/overall">
                Общий результат
              </PrimaryButton> */}
              <PrimaryButton href="./exercises">
                Назначить задание
              </PrimaryButton>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </Container>
  );
}

export default checkAuth(ApplicationPage, true, [ACCESS.psychologist]);
