import styles from "./styles.module.scss";
import Image from "next/image";
import { team } from "@/shared/data";
import { type FC } from "react";

export const Team: FC = () => {
  return (
    <section
      id="landing-team"
      className={styles.teamSection}
    >
      <h3 className={styles.title}>Команда</h3>
      <div className={styles.team}>
        {team.map((el) => {
          return (
            <div
              className={styles.teamMember}
              key={el.name}
            >
              <div className={styles.teamMemberPhotoContainer}>
                <Image
                  width={el.image.width}
                  height={el.image.height}
                  src={el.image.src}
                  alt={el.name}
                  className={styles.teamMemberPhoto}
                />
              </div>
              <div className={styles.teamMemberInfo}>
                <div className={styles.teamMemberName}>{el.name}</div>
                <div className={styles.teamMemberRole}>{el.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
