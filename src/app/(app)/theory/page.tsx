"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";
import TheoryCard from "@/components/UI/Cards/TheoryCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectGetThemesState,
  selectThemes,
} from "@/redux/features/theory/selectors";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { useEffect } from "react";
import TheoryService from "@/api/theory";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { theoryActions } from "@/redux/features/theory";

function TheoryPage() {
  const getThemesState = useAppSelector(selectGetThemesState);
  const themes = useAppSelector(selectThemes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(TheoryService.getThemes());
  }, []);

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
