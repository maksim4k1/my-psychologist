import styles from "./styles.module.scss";
import { type Theme } from "@/redux/features/theory/types";
import { type FunctionComponent } from "react";

interface TheoryProps {
  theory: Theme;
}

const TheoryCard: FunctionComponent<TheoryProps> = ({ theory }) => {
  return (
    <div className={styles.theoryCard}>
      <div className={styles.imageContainer}>
        <img
          className={styles.theoryImage}
          src="https://grizly.club/uploads/posts/2022-12/1671801390_grizly-club-p-ornament-zebra-1.jpg"
        />
        <div className={styles.theoryTags}>
          <div className={styles.theoryTag}>{theory.fullProgress} минут</div>
        </div>
      </div>
      <div className={styles.theoryTitle}>{theory.title}</div>
    </div>
  );
};

export default TheoryCard;
