import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Completed from "@/assets/svg/Completed";
import styles from "./styles.module.scss";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";

function RegistrationSuccessPage() {
  return (
    <Container>
      <div className={styles.registrationCompletedContainer}>
        <PageTitle>Регистрация завершена!</PageTitle>
        <div className={styles.svgContainer}>
          <Completed />
        </div>
        <PrimaryButton
          isLarge={true}
          href="/psychologist/survey"
        >
          Заполнить анкету психолога
        </PrimaryButton>
      </div>
    </Container>
  );
}

export default RegistrationSuccessPage;
