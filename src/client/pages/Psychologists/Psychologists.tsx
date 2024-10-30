"use client";

import styles from "./styles.module.scss";
import { PsychologistsService } from "@/client/api";
import MyPsychologistCard from "@/client/components/UI/Cards/MyPsychologistCard";
import PsychologistCard from "@/client/components/UI/Cards/PsychologistCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { selectSendApplicationState } from "@/client/redux/features/applications/selectors";
import { psychologistsActions } from "@/client/redux/features/psychologists";
import {
  selectGetMyPsychologistsState,
  selectGetPsychologistsState,
  selectMyPsychologists,
  selectPsychologists,
} from "@/client/redux/features/psychologists/selectors";
import { type FC, useEffect } from "react";

export const PsychologistsPage: FC = () => {
  const dispatch = useAppDispatch();
  const psychologists = useAppSelector(selectPsychologists);
  const myPsychologists = useAppSelector(selectMyPsychologists);
  const getPsychologistsState = useAppSelector(selectGetPsychologistsState);
  const getMyPsychologistsState = useAppSelector(selectGetMyPsychologistsState);
  const sendApplicationState = useAppSelector(selectSendApplicationState);

  useEffect(() => {
    dispatch(PsychologistsService.getMyPsychologists());
    dispatch(PsychologistsService.getPsychologists());
  }, [dispatch, sendApplicationState.isSuccess]);

  useSetDefaultState(psychologistsActions.getPsychologistsSetDefaultState);
  useSetDefaultState(psychologistsActions.getMyPsychologistsSetDefaultState);

  return (
    <Container>
      <PageTitle>Психологи</PageTitle>
      <StateWrapper state={[getPsychologistsState, getMyPsychologistsState]}>
        <h2 className={styles.subtitle}>
          {myPsychologists.length
            ? "Мои психологи"
            : "У вас пока нет психологов"}
        </h2>
        <div className={styles.psychologistList}>
          {myPsychologists.map((psychologist) => (
            <MyPsychologistCard
              key={psychologist.userId}
              psychologist={psychologist}
            />
          ))}
        </div>
        <h2 className={styles.subtitle}>
          {psychologists.length ? "Все психологи" : ""}
        </h2>
        <div className={styles.psychologistList}>
          {psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.userId}
              psychologist={psychologist}
            />
          ))}
        </div>
      </StateWrapper>
    </Container>
  );
};
