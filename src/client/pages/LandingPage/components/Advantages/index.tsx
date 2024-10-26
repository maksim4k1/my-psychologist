import styles from "./styles.module.scss";
import { type FC } from "react";

export const Advantages: FC = () => {
  return (
    <section
      id="landing-advantages"
      className={styles.infoSection}
    >
      <div className={`${styles.info} ${styles.info1}`}>
        <h2 className={`${styles.title} ${styles.infoTitle}`}>
          Как работает сервис?
        </h2>
        <ul className={styles.infoList}>
          <li className={`${styles.infoListItem} ${styles.infoListItem1}`}>
            1 шаг. Знакомство с основами самопомощи и принципами
            когнитивно-поведенческой терапии (КПТ)
          </li>
          <li className={`${styles.infoListItem} ${styles.infoListItem2}`}>
            2 шаг. Уточнение своего запроса: прохождение тестов, получение
            рекомендаций, определение целей работы
          </li>
          <li className={`${styles.infoListItem} ${styles.infoListItem3}`}>
            3 шаг. Работа с иррациональными мыслями, формирование и закрепление
            альтернативных убеждений
          </li>
        </ul>
      </div>
      <div className={`${styles.info} ${styles.info2}`}>
        <h2 className={`${styles.title} ${styles.infoTitle}`}>
          Специалисты всегда будут рядом!
        </h2>
        <p className={styles.infoDescription}>
          Предоставление психологической поддержки от профессионала при
          необходимости
        </p>
      </div>
      <div className={`${styles.info} ${styles.info3}`}>
        <h2 className={`${styles.title} ${styles.infoTitle}`}>
          Научно-доказанный подход
        </h2>
        <p className={styles.infoDescription}>
          Мы основываемся на научных данных и сами проводим исследования
          эффективности нашего приложения
        </p>
      </div>
    </section>
  );
};
