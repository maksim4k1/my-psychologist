"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import { FormikForm, PrimaryButton } from "@/client/components";
import { type FC } from "react";

interface PsychologistSurveyFormFields {
  username: string;
  birthday: string;
  education: string;
  primaryMethod: string;
  additionalEducation: string;
  diploms: FileList | null;
  careerStart: string;
  onlineExperience: string;
  currentClients: string;
  personalTherapy: string;
  supervisions: string;
  socialNetworkLink: string;
  photos: FileList | null;
  phoneNumber: string;
  about: string;
  unacceptableThings: string;
}

const initialValues: PsychologistSurveyFormFields = {
  username: "",
  birthday: "",
  education: "",
  primaryMethod: "",
  additionalEducation: "",
  diploms: null,
  careerStart: "",
  onlineExperience: "",
  currentClients: "",
  personalTherapy: "",
  supervisions: "",
  socialNetworkLink: "",
  photos: null,
  phoneNumber: "",
  about: "",
  unacceptableThings: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Данное поле обязательно"),
  birthday: Yup.string()
    .required("Дата обязательна")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}$/,
      "Введите дату в формате ДД.ММ.ГГГГ",
    )
    .test("is-valid-date", "Введите корректную дату", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split(".").map(Number);
      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }),
  education: Yup.string().required("Данное поле обязательно"),
  primaryMethod: Yup.string().required("Данное поле обязательно"),
  additionalEducation: Yup.string().required("Данное поле обязательно"),
  diploms: Yup.mixed().required("Данное поле обязательно"),
  careerStart: Yup.string().required("Данное поле обязательно"),
  onlineExperience: Yup.string().required("Данное поле обязательно"),
  currentClients: Yup.string().required("Данное поле обязательно"),
  personalTherapy: Yup.string().required("Данное поле обязательно"),
  supervisions: Yup.string().required("Данное поле обязательно"),
  socialNetworkLink: Yup.string().required("Данное поле обязательно"),
  photos: Yup.mixed().required("Данное поле обязательно"),
  phoneNumber: Yup.string()
    .required("Данное поле обязательно")
    .matches(
      /^\+[0-9]\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/,
      "Введите корректный номер телефона",
    ),
  about: Yup.string().required("Данное поле обязательно"),
  unacceptableThings: Yup.string().required("Данное поле обязательно"),
});

export const PsychologistSurveyForm: FC = () => {
  const onSubmit = (values: PsychologistSurveyFormFields) => {
    console.log(values);
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className={styles.form}
    >
      <FormikForm.Input
        name="username"
        type="text"
        placeholder="Введите Ваше имя"
        labelText="Ваши Фамилия Имя Отчество"
        required
      />
      <FormikForm.MaskedInput
        mask={"99.99.9999"}
        name="birthday"
        type="text"
        placeholder="Введите ответ"
        labelText="Ваша дата рождения?"
        required
      />
      <FormikForm.Textarea
        name="education"
        type="text"
        placeholder="Введите ответ"
        labelText="Какое у вас высшее образование? Напишите о базовом психологическом обучении или переподготовке: 1. Год окончания 2. Название ВУЗа 3. Название факультета и специалитета 4. Укажите академическую степень (бакалавриат, магистратура) или ученую степень (если есть)."
        exampleText={`Например,\n2003 - МГУ - факультет психологии, клиническая психология - бакалавр.\n2010 - ВШЭ - психоанализ - магистерская программа (2 года).`}
        required
      />
      <FormikForm.Input
        name="primaryMethod"
        type="text"
        placeholder="Введите ответ"
        labelText="Ваш основной метод?"
        required
      />
      <FormikForm.Input
        name="additionalEducation"
        type="text"
        placeholder="Введите ответ"
        labelText="Напишите, какое у вас дополнительное образование, если есть (зависимости, РПП, ПТСР или другое)"
        required
      />
      <FormikForm.FileInput
        name="diploms"
        labelText="Пожалуйста, прикрепите фотографии развернутых дипломов и сертификатов, подтверждающих обучение. Обязательные документы: (1) диплом о базовом психологическом (смежном) обучении / переподготовке (2)документы об обучении методу. Если обучение не окончено, пожалуйста, прикрепите справку из обучающего учреждения."
        accept="image/*"
        multiple
        required
      />
      <FormikForm.Input
        name="careerStart"
        type="text"
        placeholder="Введите ответ"
        labelText="Когда вы начали консультировать? За деньги, не в рамках учебной программы. Обязательно напишите месяц, не только год."
        exampleText="Например, май 2019"
        required
      />
      <FormikForm.Input
        name="onlineExperience"
        type="text"
        placeholder="Введите ответ"
        labelText="Есть ли опыт работы онлайн? Если да, то сколько лет?"
        required
      />
      <FormikForm.Input
        name="currentClients"
        type="number"
        placeholder="Введите цифру"
        labelText="Сколько клиентов у вас сейчас в практике?"
        exampleText="Пожалуйста, не за всю историю практики, а на текущий момент."
        required
        min="0"
      />
      <FormikForm.Input
        name="personalTherapy"
        type="text"
        placeholder="Введите ответ"
        labelText="Проходите ли вы личную психотерапию?"
        required
      />
      <FormikForm.Input
        name="supervisions"
        type="text"
        placeholder="Введите ответ"
        labelText="Проходите ли вы регулярные супервизии?"
        required
      />
      <FormikForm.Input
        name="socialNetworkLink"
        type="text"
        placeholder="Введите ответ"
        labelText="Ссылка на профили в социальных сетях"
        required
      />
      <FormikForm.FileInput
        name="photos"
        labelText="Прикрепите ваши фотографии. Требования к фото: 1/ Цветные 2/ Лицо по центру и хорошо освещено 3/ Размер не менее 1МБ 4/ В формате (название).jpg 5/ В количестве не более трех штук."
        exampleText="Если мы заключим с вами договор, одна из фотографий будет использована на платформе для рассказа о вас клиентам."
        accept="image/*"
        multiple
        required
      />
      <FormikForm.MaskedInput
        name="phoneNumber"
        mask="+7(999)999-99-99"
        type="tel"
        placeholder="+7(___)___-__-__"
        labelText="Номер телефона для связи."
        exampleText={`Номер должен начинаться с "+" и содержать международный код вашей страны`}
        required
      />
      <FormikForm.Textarea
        name="about"
        type="text"
        placeholder="Введите ответ"
        labelText="Расскажите нам о себе в свободной форме. Что считаете нам нужно узнать о вас, чтобы понять, какой вы специалист?"
        required
      />
      <FormikForm.Textarea
        name="unacceptableThings"
        type="text"
        placeholder="Введите ответ"
        labelText="Какие вещи вы считаете недопустимыми в психотерапевтическом процессе? Почему?"
        required
      />
      <PrimaryButton
        type="submit"
        className={styles.button}
        isMedium={true}
      >
        Сохранить
      </PrimaryButton>
    </FormikForm>
  );
};
