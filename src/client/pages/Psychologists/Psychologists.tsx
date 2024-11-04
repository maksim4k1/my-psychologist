"use client";

import { MyPsychologistCard, PsychologistCard } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import {
  useGetMyPsychologistsQuery,
  useGetPsychologistsQuery,
} from "@/client/redux";
import { type FC } from "react";

export const PsychologistsPage: FC = () => {
  const { data: psychologists, ...getPsychologistsState } =
    useGetPsychologistsQuery();
  const { data: myPsychologists, ...getMyPsychologistsState } =
    useGetMyPsychologistsQuery();

  if (getPsychologistsState.isLoading || getMyPsychologistsState.isLoading)
    return <LoadingLoop />;
  if (getPsychologistsState.isError)
    return <DefaultError error={getPsychologistsState.error} />;
  if (getMyPsychologistsState.isError)
    return <DefaultError error={getMyPsychologistsState.error} />;

  return (
    <Container>
      <PageTitle>Психологи</PageTitle>
      <h2 className={styles.subtitle}>
        {myPsychologists && myPsychologists.length
          ? "Мои психологи"
          : "У вас пока нет психологов"}
      </h2>
      <div className={styles.psychologistList}>
        {myPsychologists &&
          myPsychologists.map((psychologist) => (
            <MyPsychologistCard
              key={psychologist.userId}
              psychologist={psychologist}
            />
          ))}
      </div>
      <h2 className={styles.subtitle}>
        {psychologists && psychologists.length ? "Все психологи" : ""}
      </h2>
      <div className={styles.psychologistList}>
        {psychologists &&
          psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.userId}
              psychologist={psychologist}
            />
          ))}
      </div>
    </Container>
  );
};
