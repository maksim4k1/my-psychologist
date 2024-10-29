"use client";

import PrimaryButton from "../../Buttons/PrimaryButton";
import ProfileImage from "../../Images/ProfileImage";
import styles from "../styles.module.scss";
import { pages } from "@/shared/data";
import { GetApplicationsResponseData } from "@/shared/types";
import { type FunctionComponent } from "react";

interface Props {
  application: GetApplicationsResponseData[number];
}

const ApplicationCard: FunctionComponent<Props> = ({ application }) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={application.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <div className={styles.username}>{application.username}</div>
          <div
            className={`${styles.status} ${
              application.isOnline ? styles.isOnline : ""
            }`}
          >
            {application.isOnline ? "Онлайн" : "Был(а) недавно"}
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
      <div className={styles.problem}>{application.problem}</div>
      <div className={styles.buttons}>
        <PrimaryButton
          href={pages.application.getLink({ params: { id: application.id } })}
        >
          Профиль
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ApplicationCard;
