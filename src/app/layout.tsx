import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/reset.scss";
import "../styles/global.scss";
import Header from "@/components/UI/Header";

const font = Roboto({
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
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
