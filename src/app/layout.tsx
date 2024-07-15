import type { Metadata } from "next";
import { Roboto, Victor_Mono, Montserrat } from "next/font/google";
import "@/styles/reset.scss";
import "@/styles/global.scss";
import StoreProvider from "@/redux/StoreProvider";
import SnackbarsPortal from "@/components/portals/SnackbarsPortal";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${fontRoboto.variable} ${fontVictorMono.variable} ${fontMontserrat.variable}`}
      >
        <StoreProvider>
          {children}
          <SnackbarsPortal />
        </StoreProvider>
      </body>
    </html>
  );
}
