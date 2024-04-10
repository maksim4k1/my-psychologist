"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import { useState } from "react";
import Radio from "@/components/UI/Inputs/Radio";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Checkbox from "@/components/UI/Inputs/Checkbox";
import Form from "@/components/UI/Forms/Form";
import Subtitle from "@/components/UI/Titles/Subtitle";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import { onChangeInputHandler } from "@/utils/handlers";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";

const initialState = {
  fullName: "",
  birthday: "",
  education: "",
  about: "",
  city: "",
  workFormat: "",
  specialization: [],
  gender: "man",
};

function PsychologistSurveyPage() {
  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = onChangeInputHandler(setFormData);

  function onSubmitHandler(event: SubmitEvent) {
    event.preventDefault();
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
              value={formData.fullName}
              onChange={onChangeHandler}
            />
            <Input
              name="birthday"
              type="text"
              placeholder="Дата рождения  (ДД.ММ.ГГГГ)"
              value={formData.birthday}
              onChange={onChangeHandler}
            />
            <Input
              name="education"
              type="text"
              placeholder="Образование"
              value={formData.education}
              onChange={onChangeHandler}
            />
            <Input
              name="about"
              type="text"
              placeholder="О себе"
              value={formData.about}
              onChange={onChangeHandler}
            />
            <Input
              name="city"
              type="text"
              placeholder="Город"
              value={formData.city}
              onChange={onChangeHandler}
            />
            <Input
              name="workFormat"
              type="text"
              placeholder="Формат работы (очно, дистанционно и тд.)"
              value={formData.workFormat}
              onChange={onChangeHandler}
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
                onChange={onChangeHandler}
              />
              <Radio
                name="gender"
                value="woman"
                labelText="Женский"
                onChange={onChangeHandler}
              />
              <Radio
                name="gender"
                value="other"
                labelText="Другой"
                onChange={onChangeHandler}
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
                onChange={onChangeHandler}
              />
              <Checkbox
                name="specialization"
                value="Тревога"
                labelText="Тревога"
                onChange={onChangeHandler}
              />
              <Checkbox
                name="specialization"
                value="ПТСР"
                labelText="ПТСР"
                onChange={onChangeHandler}
              />
              <Checkbox
                name="specialization"
                value="Растройство пищевого поведения"
                labelText="Растройство пищевого поведения"
                onChange={onChangeHandler}
              />
              <Checkbox
                name="specialization"
                value="Зависимости"
                labelText="Зависимости"
                onChange={onChangeHandler}
              />
              <Checkbox
                name="specialization"
                value="Другое"
                labelText="Другое"
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default checkAuth(PsychologistSurveyPage, true, [ACCESS.client]);
