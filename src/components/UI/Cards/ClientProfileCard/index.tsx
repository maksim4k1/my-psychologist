import { ClientProfileData } from "@/redux/features/clients/types";
import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import ProfileImage from "../../Images/ProfileImage";
import Symptom from "../../Symptom";

interface ClientCardProps {
  client: ClientProfileData;
}

const ClientProfileCard: FunctionComponent<ClientCardProps> = ({ client }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.profileInfo}>
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
      <ProfileImage
        className={styles.profileImage}
        size={188}
        src={client.profileImage}
        alt={client.username}
      />
      <div className={styles.info}>Возраст: {client.age} лет</div>
      {!!client.problems.length && <div className={styles.info}>Запрос:</div>}
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
      {/* <PrimaryButton className={styles.cardButton}>Чат</PrimaryButton> */}
    </div>
  );
};

export default ClientProfileCard;
