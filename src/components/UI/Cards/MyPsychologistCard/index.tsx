import { FunctionComponent } from "react";
import ProfileImage from "../../Images/ProfileImage";
import styles from "../styles.module.scss";
import { PsychologistData } from "@/redux/features/psychologists/types";
import PrimaryButton from "../../Buttons/PrimaryButton";

interface Props {
  psychologist: PsychologistData;
}

const MyPsychologistCard: FunctionComponent<Props> = ({ psychologist }) => {
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

export default MyPsychologistCard;
