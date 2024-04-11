"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import Radio from "@/components/UI/Inputs/Radio";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Checkbox from "@/components/UI/Inputs/Checkbox";
import Form from "@/components/UI/Forms/Form";
import Subtitle from "@/components/UI/Titles/Subtitle";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { useCheckbox, useInput } from "@/hooks/inputHooks";

function PsychologistSurveyPage() {
  const [fullName, fullNameOnChange] = useInput("");
  const [birthday, birthdayOnChange] = useInput("");
  const [education, educationOnChange] = useInput("");
  const [about, aboutOnChange] = useInput("");
  const [city, cityOnChange] = useInput("");
  const [workFormat, workFormatOnChange] = useInput("");
  const [gender, genderOnChange] = useInput("man");
  const [specialization, specializationOnChange] = useCheckbox([]);

  function onSubmitHandler(event: SubmitEvent) {
    event.preventDefault();

    const formData = {
      fullName,
      birthday,
      education,
      about,
      city,
      workFormat,
      specialization,
      gender,
    };
  }

  return (
    <Container>
      <PageTitle className={styles.title}>Анкета психолога</PageTitle>
      <Form
        className={styles.form}
        onSubmit={onSubmitHandler}
      >
        <div className={styles.leftInputs}>
          <Subtitle className={styles.subtitle}>Общая информация</Subtitle>
          <div className={styles.inputs}>
            <Input
              name="fullName"
              type="text"
              placeholder="ФИО"
              value={fullName}
              onChange={fullNameOnChange}
            />
            <Input
              name="birthday"
              type="text"
              placeholder="Дата рождения  (ДД.ММ.ГГГГ)"
              value={birthday}
              onChange={birthdayOnChange}
            />
            <Input
              name="education"
              type="text"
              placeholder="Образование"
              value={education}
              onChange={educationOnChange}
            />
            <Input
              name="about"
              type="text"
              placeholder="О себе"
              value={about}
              onChange={aboutOnChange}
            />
            <Input
              name="city"
              type="text"
              placeholder="Город"
              value={city}
              onChange={cityOnChange}
            />
            <Input
              name="workFormat"
              type="text"
              placeholder="Формат работы (очно, дистанционно и тд.)"
              value={workFormat}
              onChange={workFormatOnChange}
            />
          </div>
          <PrimaryButton
            type="submit"
            className={styles.button}
            isMedium={true}
          >
            Сохранить
          </PrimaryButton>
        </div>
        <div className={styles.rightInputs}>
          <div>
            <Subtitle className={styles.subtitle}>Пол</Subtitle>
            <div className={styles.radios}>
              <Radio
                name="gender"
                value="man"
                defaultChecked
                labelText="Мужской"
                onChange={genderOnChange}
              />
              <Radio
                name="gender"
                value="woman"
                labelText="Женский"
                onChange={genderOnChange}
              />
              <Radio
                name="gender"
                value="other"
                labelText="Другой"
                onChange={genderOnChange}
              />
            </div>
          </div>
          <div>
            <Subtitle className={styles.subtitle}>Специализация</Subtitle>
            <div className={styles.checkboxes}>
              <Checkbox
                name="specialization"
                value="Депрессия"
                labelText="Депрессия"
                onChange={specializationOnChange}
              />
              <Checkbox
                name="specialization"
                value="Тревога"
                labelText="Тревога"
                onChange={specializationOnChange}
              />
              <Checkbox
                name="specialization"
                value="ПТСР"
                labelText="ПТСР"
                onChange={specializationOnChange}
              />
              <Checkbox
                name="specialization"
                value="Растройство пищевого поведения"
                labelText="Растройство пищевого поведения"
                onChange={specializationOnChange}
              />
              <Checkbox
                name="specialization"
                value="Зависимости"
                labelText="Зависимости"
                onChange={specializationOnChange}
              />
              <Checkbox
                name="specialization"
                value="Другое"
                labelText="Другое"
                onChange={specializationOnChange}
              />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default checkAuth(PsychologistSurveyPage, true, [ACCESS.client]);
