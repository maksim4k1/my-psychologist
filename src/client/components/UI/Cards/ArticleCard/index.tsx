import styles from "./styles.module.scss";
import Link from "next/link";
import PatternImage from "@/client/assets/webp/pattern.webp";
import { pages } from "@/shared/data";
import { type GetArticlesResponseData } from "@/shared/types";
import { type FC } from "react";

interface ArticlesProps {
  articles: GetArticlesResponseData[number];
}

export const ArticleCard: FC<ArticlesProps> = ({ articles }) => {
  return (
    <Link href={pages.article.getLink({ params: { id: articles.id } })}>
      <div className={styles.articlesCard}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url("${PatternImage.src}")` }}
        >
          <div className={styles.articlesTags}>
            <div className={styles.articlesTag}>
              {articles.fullProgress} минут
            </div>
          </div>
        </div>
        <div className={styles.articlesTitle}>{articles.title}</div>
      </div>
    </Link>
  );
};
