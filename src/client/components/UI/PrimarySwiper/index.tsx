"use client";

import styles from "./styles.module.scss";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import NextIcon from "@/client/assets/svg/Icons/NextIcon";
import { type FunctionComponent, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  children: ReactNode[];
  gap: number;
  slides?: number;
  className?: string;
}

const PrimarySwiper: FunctionComponent<Props> = ({
  children,
  className = "",
  gap,
  slides = 4,
}) => {
  return (
    <div className={styles.container}>
      <Swiper
        autoplay={{
          delay: 4000,
        }}
        modules={[Navigation]}
        spaceBetween={gap}
        slidesPerView={slides}
        navigation={{
          nextEl: ".swiper-next-" + gap,
          prevEl: ".swiper-prev-" + gap,
          disabledClass: styles.disabledButton,
        }}
        setWrapperSize={false}
        wrapperClass={styles.wrapper}
        className={`${styles.swiper} ${className}`}
      >
        {children.map((child, i) => (
          <SwiperSlide
            className={styles.slide}
            key={i}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`${styles.button} ${styles.prevButton} ${"swiper-prev-" + gap}`}
      >
        <NextIcon />
      </button>
      <button
        className={`${styles.button} ${styles.nextButton} ${"swiper-next-" + gap}`}
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default PrimarySwiper;
