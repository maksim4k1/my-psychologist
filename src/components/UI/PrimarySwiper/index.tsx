"use client";

import { FunctionComponent, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import styles from "./styles.module.scss";
import NextIcon from "@/assets/svg/Icons/NextIcon";

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
          nextEl: `.${styles.nextButton}`,
          prevEl: `.${styles.prevButton}`,
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
      <button className={`${styles.button} ${styles.prevButton}`}>
        <NextIcon />
      </button>
      <button className={`${styles.button} ${styles.nextButton}`}>
        <NextIcon />
      </button>
    </div>
  );
};

export default PrimarySwiper;
