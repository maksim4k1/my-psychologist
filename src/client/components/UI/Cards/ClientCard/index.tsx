import { PrimaryButton } from "../../Buttons";
import { ProfileImage } from "../../Images";
import { Symptom } from "../../Symptom";
import styles from "../styles.module.scss";
import { pages } from "@/shared/data";
import { type GetClientsResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  client: GetClientsResponseData[number];
}

export const ClientCard: FC<Props> = ({ client }) => {
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
        <PrimaryButton
          href={pages.client.getLink({ params: { id: client.userId } })}
        >
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};
