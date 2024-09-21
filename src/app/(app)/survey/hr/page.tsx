"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import AuthService from "@/api/auth";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import Form from "@/components/UI/Forms/Form";
import Input from "@/components/UI/Inputs/Input";
import PageTitle from "@/components/UI/Titles/PageTitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";
import { useInput } from "@/hooks/inputHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { authActions } from "@/redux/features/auth";
import { selectSendHrSurveyState } from "@/redux/features/auth/selectors";
import { type SendHrSurveyPayload } from "@/redux/features/auth/types";
import { PopupsService } from "@/redux/services/popups";
import { checkFormDataValidation } from "@/utils/formUtils";
import { type FormEvent, useEffect } from "react";

function HrSurveyPage() {
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
      router.push("/cabinet");
    }
  }, [sendHrSurveyState.isSuccess, dispatch, router]);

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      checkFormDataValidation(fullName, company) &&
      event.target instanceof HTMLFormElement
    ) {
      const formData: SendHrSurveyPayload = {
        fullName: fullName.value,
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
}

export default checkAuth(HrSurveyPage, true, [ACCESS.client]);
