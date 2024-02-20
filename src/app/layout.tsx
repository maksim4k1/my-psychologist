import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/reset.scss";
import "../styles/global.scss";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
