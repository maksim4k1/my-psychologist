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
import {
  useGetArticleByIdQuery,
  useGetArticlesQuery,
  useReadArticleMutation,
} from "@/client/redux";
import { type FC, useEffect } from "react";

export const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, ...getArticleState } = useGetArticleByIdQuery(id);
  const { data: articles, ...getArticlesState } = useGetArticlesQuery();
  const [readArticle] = useReadArticleMutation();

  useEffect(() => {
    if (article?.content.length) {
      const id = article.content[0].id;
      readArticle(id);
    }
  }, [readArticle, article]);

  if (getArticleState.isLoading || getArticlesState.isLoading)
    return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;
  if (getArticlesState.isError)
    return <DefaultError error={getArticlesState.error} />;

  const filteredArticles = articles
    ? articles.filter((el) => el.id !== id)
    : [];

  return (
    <Container>
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
