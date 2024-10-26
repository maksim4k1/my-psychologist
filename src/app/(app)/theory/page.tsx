"use client";

import styles from "./styles.module.scss";
import TheoryService from "@/client/api/theory";
import TheoryCard from "@/client/components/UI/Cards/TheoryCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import checkAuth from "@/client/components/hocs/checkAuth";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { theoryActions } from "@/client/redux/features/theory";
import {
  selectGetThemesState,
  selectThemes,
} from "@/client/redux/features/theory/selectors";
import { ACCESS } from "@/shared/config/access.config";
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
        {!themes.length && <Subtitle>Статей пока нет</Subtitle>}
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
