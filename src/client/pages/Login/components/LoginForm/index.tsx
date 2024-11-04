import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import {
  AppLink,
  AuthButtons,
  FormErrorLabel,
  FormikForm,
  PrimaryButton,
} from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { authActions, useLoginMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type LoginRequestData } from "@/shared/types";
import { type FC, useEffect } from "react";

const initialValues: LoginRequestData = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
  password: Yup.string().required("Данное поле обязательно"),
});

export const LoginForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.setUserData(data));
      router.push(pages.profile.path);
    }
  }, [isSuccess, data, dispatch, router]);

  const onSubmit = (values: LoginRequestData): void => {
    login(values);
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="email"
        type="email"
        placeholder="Введите адрес почты"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="password"
        type="password"
        placeholder="Введите пароль"
        disabled={isLoading}
      />
      <Link
        href={pages.resetPassword.path}
        className={styles.resetPasswordLink}
      >
        Забыли пароль?
      </Link>
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <AuthButtons className={styles.authButtons}>
        <PrimaryButton
          type="submit"
          disabled={isLoading}
        >
          Войти
        </PrimaryButton>
        <AppLink href={pages.registration.path}>Зарегистрироваться</AppLink>
      </AuthButtons>
    </FormikForm>
  );
};
