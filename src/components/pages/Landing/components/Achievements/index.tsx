import styles from "./styles.module.scss";
import PrimarySwiper from "@/components/UI/PrimarySwiper";
import { achievements } from "@/data";
import { type FC } from "react";

export const Achievements: FC = () => {
  return (
    <section
      id="landing-achievements"
      className={styles.achievementsSection}
    >
      <h3 className={styles.title}>Достижения</h3>
      <div className={styles.achievements}>
        <PrimarySwiper gap={15}>
          {achievements.map((el, i) => {
            return (
              <div
                className={`${styles.achievementCard} ${styles["achievementCard" + (i + 1)]}`}
                key={i}
              >
                <h4 className={styles.achievementTitle}>{el.title}</h4>
              </div>
            );
          })}
        </PrimarySwiper>
      </div>
    </section>
  );
};
