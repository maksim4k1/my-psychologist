"use client";

import styles from "./styles.module.scss";
import { ArticlesService } from "@/client/api";
import ArticleCard from "@/client/components/UI/Cards/ArticleCard";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import Subtitle from "@/client/components/UI/Titles/Subtitle";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { articlesActions } from "@/client/redux/features/articles";
import {
  selectArticles,
  selectGetArticlesState,
} from "@/client/redux/features/articles/selectors";
import { type FC, useEffect } from "react";

export const ArticlesPage: FC = () => {
  const getArticlesState = useAppSelector(selectGetArticlesState);
  const articles = useAppSelector(selectArticles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ArticlesService.getArticles());
  }, [dispatch]);

  useSetDefaultState(articlesActions.getArticlesDefaultState);

  return (
    <Container>
      <PageTitle className={styles.title}>Теория</PageTitle>
      <StateWrapper state={getArticlesState}>
        {!articles.length && <Subtitle>Статей пока нет</Subtitle>}
        <div className={styles.articlesList}>
          {articles.map((el) => (
            <ArticleCard
              key={el.id}
              articles={el}
            />
          ))}
        </div>
      </StateWrapper>
    </Container>
  );
};
