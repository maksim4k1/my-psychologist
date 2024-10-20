"use client";

import styles from "./styles.module.scss";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import Form from "@/components/UI/Forms/Form";
import Input from "@/components/UI/Inputs/Input";
import MaskedInput from "@/components/UI/Inputs/MaskedInput";
import Textarea from "@/components/UI/Inputs/Textarea";
import PageTitle from "@/components/UI/Titles/PageTitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";
import { useInput, useMaskedInput } from "@/hooks/inputHooks";
import { checkFormDataValidation } from "@/utils/formUtils";
import { type FormEvent } from "react";

function PsychologistSurveyPage() {
  const fullName = useInput("", { isEmpty: true });
  const birthday = useMaskedInput("", { isEmpty: true, isDate: true });
  const education = useInput("", { isEmpty: true });
  const academicDegree = useInput("");
  const methods = useInput("", { isEmpty: true });
  const additionalEducation = useInput("", { isEmpty: true });
  const workFormat = useInput("", { isEmpty: true });
  const psychologistsAssociation = useInput("");

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      checkFormDataValidation(
        fullName,
        birthday,
        education,
        academicDegree,
        methods,
        additionalEducation,
        workFormat,
        psychologistsAssociation,
      ) &&
      event.target instanceof HTMLFormElement
    ) {
      // const formData = {
      //   fullName: fullName.value,
      //   birthday: birthday.value,
      //   education: education.value,
      //   primaryMethod: primaryMethod.value,
      //   additionalEducation: additionalEducation.value,
      //   diploms: diploms.value,
      //   careerStart: careerStart.value,
      //   workFormat: workFormat.value,
      //   currentClients: currentClients.value,
      //   personalTherapy: personalTherapy.value,
      //   supervisions: supervisions.value,
      //   socialNetworkLink: socialNetworkLink.value,
      //   photos: photos.value,
      //   phoneNumber: phoneNumber.value,
      //   about: about.value,
      //   unacceptableThings: unacceptableThings.value,
      // };
      // const formData: FormData = new FormData(event.target);
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
          placeholder="Ваше Ф.И.O"
          value={fullName.value}
          onChange={fullName.onChange}
          onBlur={fullName.onBlur}
          labelText="Ваши Фамилия Имя Отчество"
          errorText={fullName.error}
          required
        />
        <MaskedInput
          name="birthday"
          type="text"
          placeholder="ДД.MM.ГГГГ"
          value={birthday.value}
          labelText="Дата рождения,"
          required
          mask={Date}
          max={new Date()}
          onBlur={birthday.onBlur}
          onAccept={birthday.onAccept}
          errorText={birthday.error}
        />
        <Textarea
          name="education"
          type="text"
          placeholder="Введите ответ"
          labelText="Образование (Год окончания вуза, ВУЗ, специальность, направление подготовки)"
          exampleText={`Например,\n2003 - МГУ - факультет психологии, клиническая психология.`}
          errorText={education.error}
          value={education.value}
          onChange={education.onChange}
          onBlur={education.onBlur}
          required
        />
        <Input
          name="academicDegree"
          type="text"
          placeholder="Введите ответ"
          labelText="Ученая степень (при наличии)"
          errorText={academicDegree.error}
          value={academicDegree.value}
          onChange={academicDegree.onChange}
          onBlur={academicDegree.onBlur}
        />
        <Input
          name="methods"
          type="text"
          placeholder="Введите ответ"
          labelText="В каком подходе-(ах) работаете?"
          errorText={methods.error}
          value={methods.value}
          onChange={methods.onChange}
          onBlur={methods.onBlur}
          required
        />
        <Input
          name="additionalEducation"
          type="text"
          placeholder="Введите ответ"
          labelText="Курсы повышения квалификации и переподготовки"
          errorText={additionalEducation.error}
          value={additionalEducation.value}
          onChange={additionalEducation.onChange}
          onBlur={additionalEducation.onBlur}
          required
        />
        <Input
          name="workFormat"
          type="text"
          placeholder="Введите ответ"
          labelText="Формат работы"
          errorText={workFormat.error}
          value={workFormat.value}
          onChange={workFormat.onChange}
          onBlur={workFormat.onBlur}
          required
        />
        <Textarea
          name="psychologistsAssociation"
          type="text"
          placeholder="Введите ответ"
          labelText="Состоите ли вы в какой-то ассоциации психологов? Если да, напишите в какой."
          errorText={psychologistsAssociation.error}
          value={psychologistsAssociation.value}
          onChange={psychologistsAssociation.onChange}
          onBlur={psychologistsAssociation.onBlur}
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

export default checkAuth(PsychologistSurveyPage, false, [ACCESS.public]);
