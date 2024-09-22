"use client";

import styles from "./styles.module.scss";
import PsychologistsService from "@/api/psychologists";
import MyPsychologistCard from "@/components/UI/Cards/MyPsychologistCard";
import PsychologistCard from "@/components/UI/Cards/PsychologistCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { selectSendApplicationState } from "@/redux/features/applications/selectors";
import { psychologistsActions } from "@/redux/features/psychologists";
import {
  selectGetMyPsychologistsState,
  selectGetPsychologistsState,
  selectMyPsychologists,
  selectPsychologists,
} from "@/redux/features/psychologists/selectors";
import { type FC, useEffect } from "react";

const PsychologistPage: FC = () => {
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

  const filteredPsychologists = psychologists.filter(
    (el) => myPsychologists.findIndex((val) => el.userId === val.userId) === -1,
  );

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
        {myPsychologists.map((psychologist) => (
          <MyPsychologistCard
            key={psychologist.userId}
            psychologist={psychologist}
          />
        ))}
        <h2 className={styles.subtitle}>
          {filteredPsychologists.length ? "Все психологи" : ""}
        </h2>
        {filteredPsychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.userId}
            psychologist={psychologist}
          />
        ))}
      </StateWrapper>
    </Container>
  );
};

export default PsychologistPage;
