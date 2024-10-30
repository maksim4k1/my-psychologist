"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { ArticlesService } from "@/client/api";
import PatternImage from "@/client/assets/webp/pattern.webp";
import { ArticleCard, Container, StateWrapper } from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useSetDefaultState,
} from "@/client/hooks";
import {
  articlesActions,
  selectArticleContent,
  selectArticles,
  selectGetArticleContentState,
  selectGetArticlesState,
} from "@/client/redux";
import { type FC, useEffect } from "react";

export const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const getArticlesState = useAppSelector(selectGetArticlesState);
  const getArticleState = useAppSelector(selectGetArticleContentState);
  const articles = useAppSelector(selectArticles);
  const article = useAppSelector(selectArticleContent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ArticlesService.getArticles());
    dispatch(ArticlesService.getArticle(id));
  }, [dispatch, id]);

  useSetDefaultState(articlesActions.getArticlesDefaultState);
  useSetDefaultState(articlesActions.getArticleDefaultState);

  const filteredArticles = articles.filter((el) => el.id !== id);

  return (
    <Container>
      <StateWrapper state={[getArticlesState, getArticleState]}>
        {article && (
          <div className={styles.main}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url("${PatternImage.src}")` }}
            >
              <h1 className={styles.title}>{article?.title}</h1>
            </div>
            <div className={styles.content}>
              {article?.content.map((el) => (
                <div
                  className={styles.contentItem}
                  key={el.id}
                >
                  {el.content}
                </div>
              ))}
            </div>
          </div>
        )}
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
