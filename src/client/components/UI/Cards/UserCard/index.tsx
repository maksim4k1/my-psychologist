import { ProfileImage } from "../../Images";
import styles from "./styles.module.scss";
import { type FC, type ReactNode } from "react";

interface Props {
  userData: {
    profileImage: string;
    username: string;
    isOnline: boolean;
  };
  children?: ReactNode;
}

export const UserCard: FC<Props> = ({ userData, children }) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={userData.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <div className={styles.username}>{userData.username}</div>
          <div
            className={`${styles.status} ${userData.isOnline ? styles.isOnline : ""}`}
          >
            {userData.isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
