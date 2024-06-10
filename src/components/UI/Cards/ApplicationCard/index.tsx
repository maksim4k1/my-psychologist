"use client";

import { FunctionComponent, useRef, useState } from "react";
import ProfileImage from "../../Images/ProfileImage";
import MoreVerticalIcon from "@/assets/svg/Icons/MoreVerticalIcon";
import PrimaryButton from "../../Buttons/PrimaryButton";
import styles from "../styles.module.scss";
import { useClickOutside } from "@/hooks/clickOutsideHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import ApplicationsService from "@/api/applications";

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
  const dispatch = useAppDispatch();
  const [moreIsOpen, setMoreIsOpen] = useState<boolean>(false);
  const more = useRef(null);
  const moreButton = useRef(null);

  useClickOutside(more, () => setMoreIsOpen(false), moreButton);

  function onClickHandler(status: boolean) {
    dispatch(ApplicationsService.confirmApplication(client.userId, status));
  }

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
        <button
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
        )}
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
