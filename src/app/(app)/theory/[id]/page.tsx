"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import TheoryService from "@/api/theory";
import PatternImage from "@/assets/webp/pattern.webp";
import TheoryCard from "@/components/UI/Cards/TheoryCard";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { ACCESS } from "@/config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { theoryActions } from "@/redux/features/theory";
import {
  selectGetThemeContentState,
  selectGetThemesState,
  selectThemeContent,
  selectThemes,
} from "@/redux/features/theory/selectors";
import { type FC, useEffect } from "react";

const TheoryPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const getThemesState = useAppSelector(selectGetThemesState);
  const getThemeContentState = useAppSelector(selectGetThemeContentState);
  const themes = useAppSelector(selectThemes);
  const themeContent = useAppSelector(selectThemeContent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(TheoryService.getThemes());
    dispatch(TheoryService.getThemeContent(id));
  }, [dispatch, id]);

  useSetDefaultState(theoryActions.getThemesDefaultState);
  useSetDefaultState(theoryActions.getThemeContentDefaultState);

  const currentTheme = themes.find((el) => el.id === id);

  const filteredThemes = themes.filter((el) => el.id === id);

  return (
    <Container>
      <StateWrapper state={[getThemesState, getThemeContentState]}>
        <div className={styles.main}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url("${PatternImage.src}")` }}
          >
            <h1 className={styles.title}>{currentTheme?.title}</h1>
          </div>
          <div className={styles.content}>
            {themeContent.map((el) => (
              <div
                className={styles.contentItem}
                key={el.id}
              >
                {el.text}
              </div>
            ))}
          </div>
        </div>
      </StateWrapper>
      {!!filteredThemes.length && (
        <div className={styles.recomendations}>
          <h3 className={styles.recomendationsTitle}>Смотрите также</h3>
          <div className={styles.theoryList}>
            {filteredThemes.map((el) => (
              <TheoryCard
                key={el.id}
                theory={el}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default checkAuth(TheoryPage, true, [ACCESS.public]);
