"use client";

import styles from "./styles.module.scss";
import TheoryService from "@/api/theory";
import TheoryCard from "@/components/UI/Cards/TheoryCard";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import checkAuth from "@/components/hocs/checkAuth";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { theoryActions } from "@/redux/features/theory";
import {
  selectGetThemesState,
  selectThemes,
} from "@/redux/features/theory/selectors";
import { useEffect } from "react";

function TheoryPage() {
  const getThemesState = useAppSelector(selectGetThemesState);
  const themes = useAppSelector(selectThemes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(TheoryService.getThemes());
  }, [dispatch]);

  useSetDefaultState(theoryActions.getThemesDefaultState);

  return (
    <Container>
      <PageTitle className={styles.title}>Теория</PageTitle>
      <StateWrapper state={getThemesState}>
        <div className={styles.theoryList}>
          {themes.map((el) => (
            <TheoryCard
              key={el.id}
              theory={el}
            />
          ))}
        </div>
      </StateWrapper>
    </Container>
  );
}

export default checkAuth(TheoryPage, true, [ACCESS.public]);
