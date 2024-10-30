"use client";

import { PrimaryButton } from "../../Buttons";
import { ProfileImage } from "../../Images";
import styles from "../styles.module.scss";
import { pages } from "@/shared/data";
import { type GetApplicationsResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  application: GetApplicationsResponseData[number];
}

export const ApplicationCard: FC<Props> = ({ application }) => {
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
