import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import ProfileImage from "@/components/UI/Images/ProfileImage";
import MoreVerticalIcon from "@/assets/svg/icons/MoreVerticalIcon";
import { FunctionComponent } from "react";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";

interface Props {
  profileImage: string;
  username: string;
  isOnline: boolean;
  problems: string[];
}

const ClientCard: FunctionComponent<Props> = ({
  profileImage,
  username,
  isOnline,
  problems,
}) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <div className={styles.username}>{username}</div>
          <div
            className={`${styles.status} ${isOnline ? styles.isOnline : ""}`}
          >
            {isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
        <button className={styles.moreButton}>
          <MoreVerticalIcon />
        </button>
      </div>
      <div className={styles.problems}>
        {problems.map((problem, index) => {
          return (
            <div
              key={index}
              className={styles.problem}
            >
              {problem}
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <SecondaryButton>Чат</SecondaryButton>
        <PrimaryButton>Профиль</PrimaryButton>
      </div>
    </div>
  );
};

function PsychologistClientsPage() {
  return (
    <Container>
      <PageTitle className={styles.title}>Мои клиенты</PageTitle>
      <div className={styles.list}>
        <ClientCard
          profileImage="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          username="Александр"
          isOnline={false}
          problems={["Депрессия", "Зависимости", "Выгорание"]}
        />
        <ClientCard
          profileImage="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          username="Алиса"
          isOnline={true}
          problems={["ПТСР", "Тревога", "РПП", "Депрессия"]}
        />
        <ClientCard
          profileImage="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          username="Виктор"
          isOnline={true}
          problems={["Выгорание"]}
        />
        <ClientCard
          profileImage="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          username="Ангелина"
          isOnline={false}
          problems={["Панические атаки", "СДВГ", "Социофобия"]}
        />
      </div>
    </Container>
  );
}

export default PsychologistClientsPage;
