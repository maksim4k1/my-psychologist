"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import { ChangeEvent, useState } from "react";
import Radio from "@/components/UI/Radio";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Checkbox from "@/components/UI/Checkbox";
import Form from "@/components/UI/Forms/Form";
import FormSubtitle from "@/components/UI/Titles/FormSubtitle";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";

interface State {
  fullName: string;
  birthday: string;
  education: string;
  about: string;
  city: string;
  workFormat: string;
  specialization: string[];
  gender: string;
}

const initialState: State = {
  fullName: "",
  birthday: "",
  education: "",
  about: "",
  city: "",
  workFormat: "",
  specialization: [],
  gender: "man",
};

function PsychologistSurvey() {
  const [formData, setFormData] = useState(initialState);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setFormData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  }

  function onClickHandler(event: ChangeEvent<HTMLInputElement>) {
    let name: string = event.target.name;
    let value: string = event.target.value;

    if (name === "specialization") {
      setFormData((data: State) => {
        let set: Set<string> = new Set(data.specialization);

        if (set.has(value)) set.delete(value);
        else set.add(value);

        return {
          ...data,
          specialization: Array.from(set),
        };
      });
    } else if (name === "gender") {
      setFormData((data: State) => ({
        ...data,
        gender: value,
      }));
    }
  }

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
          <FormSubtitle>Общая информация</FormSubtitle>
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
          <Button
            type="submit"
            className={styles.button}
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
                onClick={onClickHandler}
              />
              <Radio
                name="gender"
                value="woman"
                labelText="Женский"
                onClick={onClickHandler}
              />
              <Radio
                name="gender"
                value="other"
                labelText="Другой"
                onClick={onClickHandler}
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
                onClick={onClickHandler}
              />
              <Checkbox
                name="specialization"
                value="Тревога"
                labelText="Тревога"
                onClick={onClickHandler}
              />
              <Checkbox
                name="specialization"
                value="ПТСР"
                labelText="ПТСР"
                onClick={onClickHandler}
              />
              <Checkbox
                name="specialization"
                value="Растройство пищевого поведения"
                labelText="Растройство пищевого поведения"
                onClick={onClickHandler}
              />
              <Checkbox
                name="specialization"
                value="Зависимости"
                labelText="Зависимости"
                onClick={onClickHandler}
              />
              <Checkbox
                name="specialization"
                value="Другое"
                labelText="Другое"
                onClick={onClickHandler}
              />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default PsychologistSurvey;
