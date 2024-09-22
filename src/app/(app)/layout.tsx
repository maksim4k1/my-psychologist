import styles from "./styles.module.scss";
import Header from "@/components/UI/Header";
import { type ReactNode } from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
