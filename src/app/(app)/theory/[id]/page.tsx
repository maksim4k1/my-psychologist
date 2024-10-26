"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import TheoryService from "@/client/api/theory";
import PatternImage from "@/client/assets/webp/pattern.webp";
import TheoryCard from "@/client/components/UI/Cards/TheoryCard";
import Container from "@/client/components/UI/Container";
import checkAuth from "@/client/components/hocs/checkAuth";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { theoryActions } from "@/client/redux/features/theory";
import {
  selectGetThemeContentState,
  selectGetThemesState,
  selectThemeContent,
  selectThemes,
} from "@/client/redux/features/theory/selectors";
import { ACCESS } from "@/shared/config/access.config";
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

  const filteredThemes = themes.filter((el) => el.id !== id);

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
