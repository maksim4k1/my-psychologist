"use client";

import styles from "./styles.module.scss";
import { ArticlesService } from "@/client/api";
import {
  ArticleCard,
  Container,
  PageTitle,
  StateWrapper,
  Subtitle,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
import {
  articlesActions,
  selectArticles,
  selectGetArticlesState,
} from "@/client/redux";
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
