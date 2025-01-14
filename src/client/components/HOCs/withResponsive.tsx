"use client";

import { useAppSelector } from "@/client/hooks";
import { selectIsMobile } from "@/client/redux";
import { type FC } from "react";

interface ResponsiveProps {
  [key: string]: any;
}

export const withResponsive = <T extends ResponsiveProps>(
  Mobile: FC<T>,
  Desktop: FC<T>,
) => {
  const ResponsiveComponent: FC<T> = (props) => {
    const isMobile = useAppSelector(selectIsMobile);

    return isMobile ? <Mobile {...props} /> : <Desktop {...props} />;
  };

  return ResponsiveComponent;
};
