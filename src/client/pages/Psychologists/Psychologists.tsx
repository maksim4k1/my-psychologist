"use client";

import styles from "./styles.module.scss";
import { PsychologistsService } from "@/client/api";
import {
  Container,
  MyPsychologistCard,
  PageTitle,
  PsychologistCard,
  StateWrapper,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
import {
  psychologistsActions,
  selectGetMyPsychologistsState,
  selectGetPsychologistsState,
  selectMyPsychologists,
  selectPsychologists,
} from "@/client/redux";
import { type FC, useEffect } from "react";

export const PsychologistsPage: FC = () => {
  const dispatch = useAppDispatch();
  const psychologists = useAppSelector(selectPsychologists);
  const myPsychologists = useAppSelector(selectMyPsychologists);
  const getPsychologistsState = useAppSelector(selectGetPsychologistsState);
  const getMyPsychologistsState = useAppSelector(selectGetMyPsychologistsState);

  useEffect(() => {
    dispatch(PsychologistsService.getMyPsychologists());
    dispatch(PsychologistsService.getPsychologists());
  }, [dispatch]);

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
