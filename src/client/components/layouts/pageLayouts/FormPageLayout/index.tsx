import styles from "./styles.module.scss";
import Link from "next/link";
import { ArrowIcon } from "@/client/assets/icons";
import { Container, PageTitle } from "@/client/components";
import { FormBackground } from "@/client/components/backgrounds";
import { type FC, type ReactNode } from "react";

interface FormPageLayoutProps {
  title: ReactNode;
  children: ReactNode;
  comeBackLink?: string;
}

export const FormPageLayout: FC<FormPageLayoutProps> = ({
  title,
  children,
  comeBackLink,
}) => {
  return (
    <Container className={styles.container}>
      <div
        className={`${styles.content} ${comeBackLink ? styles.hasComeBackButton : ""}`}
      >
        <FormBackground />
        {comeBackLink && (
          <Link
            href={comeBackLink}
            className={styles.comeBackButton}
          >
            <ArrowIcon />
          </Link>
        )}
        <div className={styles.formContainer}>
          <PageTitle className={styles.title}>{title}</PageTitle>
          {children}
        </div>
      </div>
    </Container>
  );
};
