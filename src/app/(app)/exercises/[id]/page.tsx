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
  selectTestInfo,
} from "@/redux/features/tests/selectors";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";

const ExercisePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const testInfo = useAppSelector(selectTestInfo);
  const getTestInfoState = useAppSelector(selectGetTestInfoState);

  useEffect(() => {
    dispatch(TestsService.getTestInfo(id));
  }, [dispatch, id]);

  return (
    <Container>
      <StateWrapper state={getTestInfoState}>
        {testInfo && (
          <>
            <PageTitle className={styles.title}>{testInfo.title}</PageTitle>
            <p className={styles.description}>{testInfo.description}</p>
            <PrimaryButton>Начать тест</PrimaryButton>
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
