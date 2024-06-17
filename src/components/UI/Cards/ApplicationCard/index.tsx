"use client";

import { FunctionComponent } from "react";
import ProfileImage from "../../Images/ProfileImage";
import PrimaryButton from "../../Buttons/PrimaryButton";
import styles from "../styles.module.scss";
import { ApplicationData } from "@/redux/features/applications/types";

interface Props {
  client: ApplicationData;
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
        {/* <button
          className={styles.moreButton}
          ref={moreButton}
          onClick={() => setMoreIsOpen((val) => !val)}
        >
          <MoreVerticalIcon />
        </button>
        {moreIsOpen && (
          <div
            ref={more}
            className={styles.more}
          >
            <button
              className={styles.moreButtonAction}
              onClick={() => onClickHandler(true)}
            >
              Принять
            </button>
            <button
              className={styles.moreButtonAction}
              onClick={() => onClickHandler(false)}
            >
              Отклонить
            </button>
          </div>
        )} */}
      </div>
      <div className={styles.problem}>{client.problem}</div>
      <div className={styles.buttons}>
        <PrimaryButton href={`/cabinet/applications/${client.id}`}>
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ApplicationCard;
