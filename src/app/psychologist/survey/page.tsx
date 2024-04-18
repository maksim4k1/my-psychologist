"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Form from "@/components/UI/Forms/Form";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { useCheckbox, useInput, useMaskedInput } from "@/hooks/inputHooks";
import MaskedInput from "@/components/UI/Inputs/MaskedInput";
import { checkFormDataValidation } from "@/utils/formUtils";

function PsychologistSurveyPage() {
  const fullName = useInput("");
  const birthday = useMaskedInput("", { isDate: true });
  const education = useInput("");
  const about = useInput("");
  const city = useInput("");
  const workFormat = useInput("");
  const gender = useInput("man");
  const specialization = useCheckbox([]);

  function onSubmitHandler(event: SubmitEvent) {
    event.preventDefault();

    if (checkFormDataValidation(birthday)) {
      const formData = {
        fullName: fullName.value,
        birthday: birthday.value,
        education: education.value,
        about: about.value,
        city: city.value,
        workFormat: workFormat.value,
        specialization: specialization.value,
        gender: gender.value,
      };
      console.log(formData);
    }
  }

  return (
    <Container>
      <PageTitle className={styles.title}>Анкета психолога</PageTitle>
      <Form
        className={styles.form}
        onSubmit={onSubmitHandler}
      >
        <Input
          name="fullName"
          type="text"
          placeholder="ФИО"
          value={fullName.value}
          onChange={fullName.onChange}
        />
        <MaskedInput
          name="birthday"
          type="text"
          placeholder="Дата рождения  (ДД.ММ.ГГГГ)"
          value={birthday.value}
          mask={Date}
          max={new Date()}
          onBlur={birthday.onBlur}
          onAccept={birthday.onAccept}
          errorText={birthday.error}
        />
        <Input
          name="education"
          type="text"
          placeholder="Образование"
          value={education.value}
          onChange={education.onChange}
        />
        <Input
          name="about"
          type="text"
          placeholder="О себе"
          value={about.value}
          onChange={about.onChange}
        />
        <Input
          name="city"
          type="text"
          placeholder="Город"
          value={city.value}
          onChange={city.onChange}
        />
        <Input
          name="workFormat"
          type="text"
          placeholder="Формат работы (очно, дистанционно и тд.)"
          value={workFormat.value}
          onChange={workFormat.onChange}
        />
        <PrimaryButton
          type="submit"
          className={styles.button}
          isMedium={true}
        >
          Сохранить
        </PrimaryButton>
      </Form>
    </Container>
  );
}

export default checkAuth(PsychologistSurveyPage, true, [ACCESS.client]);
