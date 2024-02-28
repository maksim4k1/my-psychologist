import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "../styles/reset.scss";
import "../styles/global.scss";

const font = IBM_Plex_Sans({
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
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
      <body className={font.className}>{children}</body>
    </html>
  );
}
