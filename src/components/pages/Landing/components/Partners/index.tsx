import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import PrimarySwiper from "@/components/UI/PrimarySwiper";
import { partners } from "@/data";
import { type FC } from "react";

export const Partners: FC = () => {
  return (
    <section
      id="landing-partners"
      className={styles.partnersSection}
    >
      <h3 className={`${styles.title} ${styles.partnersTitle}`}>
        Наши партнёры
      </h3>
      <PrimarySwiper
        gap={20}
        slides={6}
      >
        {partners.map((el) => {
          return (
            <Link
              className={styles.partnerLink}
              target="_blank"
              href={el.link}
              key={el.name}
            >
              <Image
                width={el.image.width}
                height={el.image.height}
                src={el.image.src}
                alt={el.name}
                className={styles.partnerImage}
              />
            </Link>
          );
        })}
      </PrimarySwiper>
    </section>
  );
};
