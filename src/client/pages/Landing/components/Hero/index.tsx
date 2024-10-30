import styles from "./styles.module.scss";
import { type FC } from "react";

export const Hero: FC = () => {
  return (
    <section className={styles.mainSection}>
      <h1 className={styles.title}>
        Найди путь к{" "}
        <strong className={styles.strong}>душевному спокойствию</strong> и{" "}
        <strong className={styles.strong}>эмоциональной стабильности</strong> с
        нами!
      </h1>
    </section>
  );
};
