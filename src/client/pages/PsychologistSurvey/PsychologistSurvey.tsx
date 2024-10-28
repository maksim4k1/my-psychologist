"use client";

import styles from "./styles.module.scss";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import Form from "@/client/components/UI/Forms/Form";
import FileInput from "@/client/components/UI/Inputs/FileInput";
import Input from "@/client/components/UI/Inputs/Input";
import MaskedInput from "@/client/components/UI/Inputs/MaskedInput";
import Textarea from "@/client/components/UI/Inputs/Textarea";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import { useFileInput, useInput, useMaskedInput } from "@/client/hooks";
import { checkFormDataValidation } from "@/client/utils";
import { type FC, type FormEvent } from "react";

export const PsychologistSurveyPage: FC = () => {
  const fullName = useInput("", { isEmpty: true });
  const birthday = useMaskedInput("", { isEmpty: true, isDate: true });
  const education = useInput("", { isEmpty: true });
  const primaryMethod = useInput("", { isEmpty: true });
  const additionalEducation = useInput("", { isEmpty: true });
  const diploms = useFileInput(undefined, { isEmpty: true });
  const careerStart = useInput("", { isEmpty: true });
  const onlineExperience = useInput("", { isEmpty: true });
  const currentClients = useInput("", { isEmpty: true });
  const personalTherapy = useInput("", { isEmpty: true });
  const supervisions = useInput("", { isEmpty: true });
  const socialNetworkLink = useInput("", { isEmpty: true });
  const photos = useFileInput(undefined, { isEmpty: true });
  const phoneNumber = useMaskedInput("", {
    isEmpty: true,
    isPhoneNumber: true,
  });
  const about = useInput("", { isEmpty: true });
  const unacceptableThings = useInput("", { isEmpty: true });

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      checkFormDataValidation(
        fullName,
        birthday,
        education,
        primaryMethod,
        additionalEducation,
        diploms,
        careerStart,
        onlineExperience,
        currentClients,
        personalTherapy,
        supervisions,
        socialNetworkLink,
        photos,
        phoneNumber,
        about,
        unacceptableThings,
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
      //   onlineExperience: onlineExperience.value,
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
          placeholder="Введите Ваше имя"
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
          placeholder="Введите ответ"
          value={birthday.value}
          labelText="Ваша дата рождения? Число.Месяц.Год"
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
          labelText="Какое у вас высшее образование? Напишите о базовом психологическом обучении или переподготовке: 1. Год окончания 2. Название ВУЗа 3. Название факультета и специалитета 4. Укажите академическую степень (бакалавриат, магистратура) или ученую степень (если есть)."
          exampleText={`Например,\n2003 - МГУ - факультет психологии, клиническая психология - бакалавр.\n2010 - ВШЭ - психоанализ - магистерская программа (2 года).`}
          errorText={education.error}
          value={education.value}
          onChange={education.onChange}
          onBlur={education.onBlur}
          required
        />
        <Input
          name="primaryMethod"
          type="text"
          placeholder="Введите ответ"
          labelText="Ваш основной метод?"
          errorText={primaryMethod.error}
          value={primaryMethod.value}
          onChange={primaryMethod.onChange}
          onBlur={primaryMethod.onBlur}
          required
        />
        <Input
          name="additionalEducation"
          type="text"
          placeholder="Введите ответ"
          labelText="Напишите, какое у вас дополнительное образование, если есть (зависимости, РПП, ПТСР или другое)"
          errorText={additionalEducation.error}
          value={additionalEducation.value}
          onChange={additionalEducation.onChange}
          onBlur={additionalEducation.onBlur}
          required
        />
        <FileInput
          name="diploms"
          labelText="Пожалуйста, прикрепите фотографии развернутых дипломов и сертификатов, подтверждающих обучение. Обязательные документы: (1) диплом о базовом психологическом (смежном) обучении / переподготовке (2)документы об обучении методу. Если обучение не окончено, пожалуйста, прикрепите справку из обучающего учреждения."
          errorText={diploms.error}
          onChoose={diploms.onChoose}
          multiple
          required
        />
        <Input
          name="careerStart"
          type="text"
          placeholder="Введите ответ"
          labelText="Когда вы начали консультировать? За деньги, не в рамках учебной программы. Обязательно напишите месяц, не только год."
          exampleText="Например, май 2019"
          errorText={careerStart.error}
          value={careerStart.value}
          onChange={careerStart.onChange}
          onBlur={careerStart.onBlur}
          required
        />
        <Input
          name="onlineExperience"
          type="text"
          placeholder="Введите ответ"
          labelText="Есть ли опыт работы онлайн? Если да, то сколько лет?"
          errorText={onlineExperience.error}
          value={onlineExperience.value}
          onChange={onlineExperience.onChange}
          onBlur={onlineExperience.onBlur}
          required
        />
        <Input
          name="currentClients"
          type="number"
          placeholder="Введите цифру"
          labelText="Сколько клиентов у вас сейчас в практике?"
          exampleText="Пожалуйста, не за всю историю практики, а на текущий момент."
          errorText={currentClients.error}
          value={currentClients.value}
          onChange={currentClients.onChange}
          onBlur={currentClients.onBlur}
          required
          min="0"
        />
        <Input
          name="personalTherapy"
          type="text"
          placeholder="Введите ответ"
          labelText="Проходите ли вы личную психотерапию?"
          errorText={personalTherapy.error}
          value={personalTherapy.value}
          onChange={personalTherapy.onChange}
          onBlur={personalTherapy.onBlur}
          required
        />
        <Input
          name="supervisions"
          type="text"
          placeholder="Введите ответ"
          labelText="Проходите ли вы регулярные супервизии?"
          errorText={supervisions.error}
          value={supervisions.value}
          onChange={supervisions.onChange}
          onBlur={supervisions.onBlur}
          required
        />
        <Input
          name="socialNetworkLink"
          type="text"
          placeholder="Введите ответ"
          labelText="Ссылка на профили в социальных сетях"
          errorText={socialNetworkLink.error}
          value={socialNetworkLink.value}
          onChange={socialNetworkLink.onChange}
          onBlur={socialNetworkLink.onBlur}
          required
        />
        <FileInput
          name="photos"
          labelText="Прикрепите ваши фотографии. Требования к фото: 1/ Цветные 2/ Лицо по центру и хорошо освещено 3/ Размер не менее 1МБ 4/ В формате (название).jpg 5/ В количестве не более трех штук."
          exampleText="Если мы заключим с вами договор, одна из фотографий будет использована на платформе для рассказа о вас клиентам."
          errorText={photos.error}
          onChoose={photos.onChoose}
          multiple
          required
        />
        <MaskedInput
          name="phoneNumber"
          type="tel"
          placeholder="Введите ответ"
          labelText="Номер телефона для связи."
          exampleText={`Номер должен начинаться с "+" и содержать международный код вашей страны`}
          errorText={phoneNumber.error}
          value={phoneNumber.value}
          onAccept={phoneNumber.onAccept}
          onBlur={phoneNumber.onBlur}
          required
        />
        <Textarea
          name="about"
          type="text"
          placeholder="Введите ответ"
          labelText="Расскажите нам о себе в свободной форме. Что считаете нам нужно узнать о вас, чтобы понять, какой вы специалист?"
          errorText={about.error}
          value={about.value}
          onChange={about.onChange}
          onBlur={about.onBlur}
          required
        />
        <Textarea
          name="unacceptableThings"
          type="text"
          placeholder="Введите ответ"
          labelText="Какие вещи вы считаете недопустимыми в психотерапевтическом процессе? Почему?"
          errorText={unacceptableThings.error}
          value={unacceptableThings.value}
          onChange={unacceptableThings.onChange}
          onBlur={unacceptableThings.onBlur}
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
};
