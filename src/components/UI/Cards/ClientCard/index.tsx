import { FunctionComponent } from "react";
import ProfileImage from "../../Images/ProfileImage";
import MoreVerticalIcon from "@/assets/svg/Icons/MoreVerticalIcon";
import PrimaryButton from "../../Buttons/PrimaryButton";
import styles from "../styles.module.scss";
import Symptom from "../../Symptom";

interface Client {
  userId: number;
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

interface Props {
  client: Client;
}

const ClientCard: FunctionComponent<Props> = ({ client }) => {
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
        {/* <button className={styles.moreButton}>
          <MoreVerticalIcon />
        </button> */}
      </div>
      <div className={styles.problems}>
        {client.problems.map((problem, index) => {
          return (
            <Symptom
              key={index}
              problem={problem}
            />
          );
        })}
      </div>
      <div className={styles.buttons}>
        <PrimaryButton href={`/psychologist/clients/${client.userId}`}>
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ClientCard;
