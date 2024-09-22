import type { Metadata } from "next";
import { Montserrat, Roboto, Victor_Mono } from "next/font/google";
import ModalsPortal from "@/components/portals/ModalsPortal";
import SnackbarsPortal from "@/components/portals/SnackbarsPortal";
import StoreProvider from "@/redux/StoreProvider";
import "@/styles/global.scss";
import "@/styles/reset.scss";
import { type ReactNode } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
}
