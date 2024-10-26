"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import ArticlesService from "@/client/api/articles";
import PatternImage from "@/client/assets/webp/pattern.webp";
import ArticleCard from "@/client/components/UI/Cards/ArticleCard";
import Container from "@/client/components/UI/Container";
import StateWrapper from "@/client/components/wrappers/StateWrapper";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { articlesActions } from "@/client/redux/features/articles";
import {
  selectArticleContent,
  selectArticles,
  selectGetArticleContentState,
  selectGetArticlesState,
} from "@/client/redux/features/articles/selectors";
import { type FC, useEffect } from "react";

export const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const getArticlesState = useAppSelector(selectGetArticlesState);
  const getArticleContentState = useAppSelector(selectGetArticleContentState);
  const articles = useAppSelector(selectArticles);
  const articleContent = useAppSelector(selectArticleContent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ArticlesService.getArticles());
    dispatch(ArticlesService.getArticleContent(id));
  }, [dispatch, id]);

  useSetDefaultState(articlesActions.getArticlesDefaultState);
  useSetDefaultState(articlesActions.getArticleContentDefaultState);

  const currentArticle = articles.find((el) => el.id === id);

  const filteredArticles = articles.filter((el) => el.id !== id);

  return (
    <Container>
      <StateWrapper state={[getArticlesState, getArticleContentState]}>
        <div className={styles.main}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url("${PatternImage.src}")` }}
          >
            <h1 className={styles.title}>{currentArticle?.title}</h1>
          </div>
          <div className={styles.content}>
            {articleContent.map((el) => (
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
      {!!filteredArticles.length && (
        <div className={styles.recomendations}>
          <h3 className={styles.recomendationsTitle}>Смотрите также</h3>
          <div className={styles.articlesList}>
            {filteredArticles.map((el) => (
              <ArticleCard
                key={el.id}
                articles={el}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};
