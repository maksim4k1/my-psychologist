"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import AuthService from "@/client/api/auth";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import Form from "@/client/components/UI/Forms/Form";
import Input from "@/client/components/UI/Inputs/Input";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import checkAuth from "@/client/components/hocs/checkAuth";
import { useInput } from "@/client/hooks/inputHooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { authActions } from "@/client/redux/features/auth";
import { selectSendHrSurveyState } from "@/client/redux/features/auth/selectors";
import { type SendHrSurveyPayload } from "@/client/redux/features/auth/types";
import { PopupsService } from "@/client/redux/services/popups";
import { checkFormDataValidation } from "@/client/utils/formUtils";
import { ACCESS } from "@/shared/config/access.config";
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
