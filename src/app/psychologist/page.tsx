import GroupIcon from "@/assets/svg/Icons/GroupIcon";
import MessageIcon from "@/assets/svg/Icons/MessageIcon";
import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import IconTextLink from "@/components/UI/Links/IconTextLink";
import styles from "./styles.module.scss";
import { FunctionComponent } from "react";
import ProfileImage from "@/components/UI/Images/ProfileImage";
import PrimarySwiper from "@/components/UI/PrimarySwiper";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../config/access.config";

interface Props {
  username: string;
  content: string;
}

const ApplicationCard: FunctionComponent<Props> = ({ username, content }) => {
  return (
    <div className={styles.card}>
      <ProfileImage
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="profile"
        size={40}
      />
      <div className={styles.info}>
        <div className={styles.username}>{username}</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

async function PsychologistPage() {
  return (
    <Container>
      <PageTitle>Кабинет психолога</PageTitle>
      <nav className={styles.navigation}>
        <IconTextLink
          href="/psychologist/clients"
          icon={<GroupIcon />}
          content="Клиенты"
        />
        <IconTextLink
          href=""
          icon={<MessageIcon />}
          content="Сообщения"
          count={3}
        />
      </nav>

      <div>
        <h2 className={styles.subtitle}>Заявки</h2>
        <PrimarySwiper gap={8}>
          <ApplicationCard
            username="Евгений"
            content="Здравствуйте! За эту неделю я выгорел уже 20 раз и больше не намерен это терпеть"
          />
          <ApplicationCard
            username="Лаврентий"
            content="Я думаю, что за мной следит утка, что мне делать?"
          />
          <ApplicationCard
            username="Александра"
            content="Привет, я не люблю общаться с людьми, только со своей собакой"
          />
          <ApplicationCard
            username="Александра"
            content="Привет, я не люблю общаться с людьми, только со своей собакой"
          />
        </PrimarySwiper>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistPage, true, [ACCESS.psychologist]);
