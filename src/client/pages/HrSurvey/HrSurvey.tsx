"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { AuthService } from "@/client/api";
import {
  Container,
  Form,
  Input,
  PageTitle,
  PrimaryButton,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useInput,
  useSetDefaultState,
} from "@/client/hooks";
import {
  PopupsService,
  authActions,
  selectSendHrSurveyState,
} from "@/client/redux";
import { checkFormDataValidation } from "@/client/utils";
import { pages } from "@/shared/data";
import { type SendHrSurveyRequestData } from "@/shared/types";
import { type FC, type FormEvent, useEffect } from "react";

export const HrSurveyPage: FC = () => {
  const fullName = useInput("", { isEmpty: true });
  const company = useInput("", { isEmpty: true });
  const dispatch = useAppDispatch();
  const sendHrSurveyState = useAppSelector(selectSendHrSurveyState);
  const router = useRouter();

  useEffect(() => {
    if (sendHrSurveyState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Анкета HR-менеджера сохранена!"),
      );
      router.push(pages.cabinet.path);
    }
  }, [sendHrSurveyState.isSuccess, dispatch, router]);

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      checkFormDataValidation(fullName, company) &&
      event.target instanceof HTMLFormElement
    ) {
      const formData: SendHrSurveyRequestData = {
        username: fullName.value,
        company: company.value,
      };

      dispatch(AuthService.sendHrSurvey(formData));
    }
  }

  useSetDefaultState(authActions.sendHrSurveySetDefaultState);

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
          disabled={sendHrSurveyState.isLoading}
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
          disabled={sendHrSurveyState.isLoading}
          required
        />
        <PrimaryButton
          type="submit"
          className={styles.button}
          isMedium={true}
          disabled={sendHrSurveyState.isLoading}
        >
          Сохранить
        </PrimaryButton>
      </Form>
    </Container>
  );
};
