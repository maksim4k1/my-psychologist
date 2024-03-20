"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import { useState } from "react";
import Radio from "@/components/UI/Radio";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Checkbox from "@/components/UI/Checkbox";
import Form from "@/components/UI/Forms/Form";
import FormSubtitle from "@/components/UI/Titles/FormSubtitle";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";
import { onChangeInputHandler } from "@/utils/handlers";

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
    console.log(formData);
  }

  return (
    <Container>
      <PageTitle className={styles.title}>Анкета психолога</PageTitle>
      <Form
        className={styles.form}
        onSubmit={onSubmitHandler}
      >
        <div className={styles.leftInputs}>
          <FormSubtitle className={styles.subtitle}>
            Общая информация
          </FormSubtitle>
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
          <Button
            type="submit"
            className={styles.button}
            isMedium={true}
          >
            Сохранить
          </Button>
        </div>
        <div className={styles.rightInputs}>
          <div>
            <FormSubtitle className={styles.subtitle}>Пол</FormSubtitle>
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
            <FormSubtitle className={styles.subtitle}>
              Специализация
            </FormSubtitle>
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

export default PsychologistSurveyPage;
