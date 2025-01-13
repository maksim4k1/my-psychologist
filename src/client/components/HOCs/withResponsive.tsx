"use client";

import { useAppSelector } from "@/client/hooks";
import { selectIsMobile } from "@/client/redux";
import { type FC } from "react";

export const withResponsive = (Mobile: FC, Desktop: FC) => {
  const ResponsiveComponent: FC = () => {
    const isMobile = useAppSelector(selectIsMobile);

    return isMobile ? <Mobile /> : <Desktop />;
  };

  return ResponsiveComponent;
};
