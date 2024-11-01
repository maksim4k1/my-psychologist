"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import PatternImage from "@/client/assets/webp/pattern.webp";
import {
  ArticleCard,
  Container,
  DefaultError,
  LoadingLoop,
} from "@/client/components";
import { useGetArticleByIdQuery, useGetArticlesQuery } from "@/client/redux";
import { type FC } from "react";

export const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const getArticleQuery = useGetArticleByIdQuery(id);
  const getArticlesQuery = useGetArticlesQuery();

  if (getArticleQuery.isLoading || getArticlesQuery.isLoading)
    return <LoadingLoop />;
  if (getArticleQuery.isError)
    return <DefaultError error={getArticleQuery.error} />;
  if (getArticlesQuery.isError)
    return <DefaultError error={getArticlesQuery.error} />;

  const filteredArticles = getArticlesQuery.data
    ? getArticlesQuery.data.filter((el) => el.id !== id)
    : [];

  return (
    <Container>
      {getArticleQuery.data && (
        <div className={styles.main}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url("${PatternImage.src}")` }}
          >
            <h1 className={styles.title}>{getArticleQuery.data?.title}</h1>
          </div>
          <div className={styles.content}>
            {getArticleQuery.data?.content.map((el) => (
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
      {filteredArticles.length && (
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
