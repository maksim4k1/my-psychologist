import { PsychologistSurveyForm } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const PsychologistSurveyPage: FC = () => {
  // const fullName = useInput("", { isEmpty: true });
  // const birthday = useMaskedInput("", { isEmpty: true, isDate: true });
  // const education = useInput("", { isEmpty: true });
  // const primaryMethod = useInput("", { isEmpty: true });
  // const additionalEducation = useInput("", { isEmpty: true });
  // const diploms = useFileInput(undefined, { isEmpty: true });
  // const careerStart = useInput("", { isEmpty: true });
  // const onlineExperience = useInput("", { isEmpty: true });
  // const currentClients = useInput("", { isEmpty: true });
  // const personalTherapy = useInput("", { isEmpty: true });
  // const supervisions = useInput("", { isEmpty: true });
  // const socialNetworkLink = useInput("", { isEmpty: true });
  // const photos = useFileInput(undefined, { isEmpty: true });
  // const phoneNumber = useMaskedInput("", {
  //   isEmpty: true,
  //   isPhoneNumber: true,
  // });
  // const about = useInput("", { isEmpty: true });
  // const unacceptableThings = useInput("", { isEmpty: true });

  return (
    <Container>
      <PageTitle className={styles.title}>Анкета психолога</PageTitle>
      <PsychologistSurveyForm />
    </Container>
  );
};
