import { FunctionComponent } from "react";
import ProfileImage from "../../Images/ProfileImage";
import MoreVerticalIcon from "@/assets/svg/Icons/MoreVerticalIcon";
import PrimaryButton from "../../Buttons/PrimaryButton";
import styles from "../styles.module.scss";

interface Application {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problem: string;
}

interface Props {
  client: Application;
}

const ApplicationCard: FunctionComponent<Props> = ({ client }) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={client.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <div className={styles.username}>{client.username}</div>
          <div
            className={`${styles.status} ${
              client.isOnline ? styles.isOnline : ""
            }`}
          >
            {client.isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
        <button className={styles.moreButton}>
          <MoreVerticalIcon />
        </button>
      </div>
      <div className={styles.problem}>{client.problem}</div>
      <div className={styles.buttons}>
        <PrimaryButton href={`/psychologist/clients/${client.userId}`}>
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ApplicationCard;
