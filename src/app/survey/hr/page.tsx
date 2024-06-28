"use client";

import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import Form from "@/components/UI/Forms/Form";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { useInput } from "@/hooks/inputHooks";
import { checkFormDataValidation } from "@/utils/formUtils";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import HrService from "@/api/hr";
import { SendHrSurveyPayload } from "@/redux/features/hr/types";
import { selectSendHrSurveyState } from "@/redux/features/hr/selectors";
import { useRouter } from "next/navigation";
import { PopupsService } from "@/redux/services/popups";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { hrActions } from "@/redux/features/hr";

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

      dispatch(HrService.sendHrSurvey(formData));
    }
  }

  useSetDefaultState(hrActions.sendHrSurveySetDefaultState());

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
