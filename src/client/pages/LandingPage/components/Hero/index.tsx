import styles from "./styles.module.scss";
import Image from "next/image";
import MainImage from "@/client/assets/webp/meditaion.webp";
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
      <Image
        width={MainImage.width}
        height={MainImage.height}
        src={MainImage.src}
        alt="Найди путь к душевному спокойствию"
        className={styles.mainSectionImage}
      />
    </section>
  );
};
