import styles from "./styles.module.scss";
import Link from "next/link";
import PatternImage from "@/client/assets/webp/pattern.webp";
import { type Article } from "@/client/redux/features/articles/types";
import { pages } from "@/shared/data";
import { type FunctionComponent } from "react";

interface ArticlesProps {
  articles: Article;
}

const ArticleCard: FunctionComponent<ArticlesProps> = ({ articles }) => {
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

export default ArticleCard;
