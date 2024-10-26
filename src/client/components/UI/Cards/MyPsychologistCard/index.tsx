import PrimaryButton from "../../Buttons/PrimaryButton";
import ProfileImage from "../../Images/ProfileImage";
import styles from "../styles.module.scss";
import { type PsychologistData } from "@/client/redux/features/psychologists/types";
import { type FunctionComponent } from "react";

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
