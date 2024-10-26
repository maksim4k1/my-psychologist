import styles from "./styles.module.scss";
import Link from "next/link";
import PatternImage from "@/client/assets/webp/pattern.webp";
import { type Theme } from "@/client/redux/features/theory/types";
import { type FunctionComponent } from "react";

interface TheoryProps {
  theory: Theme;
}

const TheoryCard: FunctionComponent<TheoryProps> = ({ theory }) => {
  return (
    <Link href={`/theory/${theory.id}`}>
      <div className={styles.theoryCard}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url("${PatternImage.src}")` }}
        >
          <div className={styles.theoryTags}>
            <div className={styles.theoryTag}>{theory.fullProgress} минут</div>
          </div>
        </div>
        <div className={styles.theoryTitle}>{theory.title}</div>
      </div>
    </Link>
  );
};

export default TheoryCard;
