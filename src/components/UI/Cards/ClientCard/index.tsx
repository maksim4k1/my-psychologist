import PrimaryButton from "../../Buttons/PrimaryButton";
import ProfileImage from "../../Images/ProfileImage";
import Symptom from "../../Symptom";
import styles from "../styles.module.scss";
import { type ClientData } from "@/redux/features/clients/types";
import { type FunctionComponent } from "react";

interface Props {
  client: ClientData;
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
        <PrimaryButton href={`/cabinet/clients/${client.userId}`}>
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ClientCard;
