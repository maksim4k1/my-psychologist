"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Form from "@/components/UI/Forms/Form";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { useInput } from "@/hooks/inputHooks";
import { checkFormDataValidation } from "@/utils/formUtils";
import { FormEvent } from "react";

function HrSurveyPage() {
  const fullName = useInput("", { isEmpty: true });
  const company = useInput("", { isEmpty: true });

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      checkFormDataValidation(fullName, company) &&
      event.target instanceof HTMLFormElement
    ) {
      const formData = {
        fullName: fullName.value,
        company: company.value,
      };

      console.log(formData);
    }
  }

  return (
    <Container>
      <PageTitle className={styles.title}>Анкета HR</PageTitle>
      <Form
        className={styles.form}
        onSubmit={onSubmitHandler}
      >
        <Input
          name="fullName"
          type="text"
          placeholder="Введите Ваше имя"
          value={fullName.value}
          onChange={fullName.onChange}
          onBlur={fullName.onBlur}
          labelText="Ваши Фамилия Имя Отчество"
          errorText={fullName.error}
          required
        />
        <Input
          name="company"
          type="text"
          placeholder="Введите ответ"
          labelText="Название организации, в которой вы работаете"
          errorText={company.error}
          value={company.value}
          onChange={company.onChange}
          onBlur={company.onBlur}
          required
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

export default checkAuth(HrSurveyPage, true, [ACCESS.client]);
