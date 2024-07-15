import Header from "@/components/UI/Header";
import styles from "./styles.module.scss";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
