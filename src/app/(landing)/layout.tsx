import LandingFooter from "@/components/landing/Footer";
import styles from "./styles.module.scss";
import LandingHeader from "@/components/landing/Header";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.body}>
      <LandingHeader />
      <main className={styles.main}>{children}</main>
      <LandingFooter />
    </div>
  );
}
