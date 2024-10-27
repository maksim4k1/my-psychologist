import type { Metadata } from "next";
import { Montserrat, Roboto, Victor_Mono } from "next/font/google";
import ModalsPortal from "@/client/components/portals/ModalsPortal";
import SnackbarsPortal from "@/client/components/portals/SnackbarsPortal";
import StoreProvider from "@/client/redux/StoreProvider";
import "@/client/styles/global.scss";
import "@/client/styles/reset.scss";
import { type FC, type ReactNode } from "react";

export const fontRoboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const fontVictorMono = Victor_Mono({
  weight: ["700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-victor-mono",
});

export const fontMontserrat = Montserrat({
  weight: ["400", "600"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Обсудим?",
  description:
    "Программная система для сопровождения психотерапии и самостоятельной проработки психологических проблем",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="ru">
      <body
        className={`${fontRoboto.variable} ${fontVictorMono.variable} ${fontMontserrat.variable}`}
      >
        <StoreProvider>
          {children}
          <SnackbarsPortal />
          <ModalsPortal />
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
