import { PrimaryButton } from "../../Buttons";
import { ProfileImage } from "../../Images";
import styles from "../styles.module.scss";
import { type GetPsychologistsResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const MyPsychologistCard: FC<Props> = ({ psychologist }) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={psychologist.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <div className={styles.username}>{psychologist.username}</div>
          <div
            className={`${styles.status} ${
              psychologist.isOnline ? styles.isOnline : ""
            }`}
          >
            {psychologist.isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
      </div>
      <div className={styles.info}></div>
      <div className={styles.buttons}>
        <PrimaryButton>Профиль</PrimaryButton>
      </div>
    </div>
  );
};
