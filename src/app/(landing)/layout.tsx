import styles from "./styles.module.scss";
import LandingFooter from "@/components/landing/Footer";
import LandingHeader from "@/components/landing/Header";
import { type ReactNode } from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={styles.body}>
      <LandingHeader />
      <main className={styles.main}>{children}</main>
      <LandingFooter />
    </div>
  );
}
