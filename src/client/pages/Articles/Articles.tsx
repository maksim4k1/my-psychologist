"use client";

import styles from "./styles.module.scss";
import {
  ArticleCard,
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  Subtitle,
} from "@/client/components";
import { useGetArticlesQuery } from "@/client/redux";
import { type FC } from "react";

export const ArticlesPage: FC = () => {
  const { data, isError, isLoading, error } = useGetArticlesQuery();

  if (isLoading) return <LoadingLoop />;
  if (isError) return <DefaultError error={error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>Теория</PageTitle>
      {!data || !data.length ? (
        <Subtitle>Статей пока нет</Subtitle>
      ) : (
        <div className={styles.articlesList}>
          {data.map((el) => (
            <ArticleCard
              key={el.id}
              articles={el}
            />
          ))}
        </div>
      )}
    </Container>
  );
};
