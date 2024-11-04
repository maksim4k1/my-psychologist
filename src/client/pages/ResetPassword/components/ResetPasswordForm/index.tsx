import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FormikForm, PrimaryButton } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

interface ResetPasswordFields {
  email: string;
}

const initialValues: ResetPasswordFields = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
});

export const ResetPasswordForm: FC = () => {
  const router = useRouter();

  const onSubmit = (values: ResetPasswordFields) => {
    console.log(values);
    router.push(pages.changePassword.path);
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
        placeholder="Введите адрес электронной почты"
        required
      />
      <PrimaryButton
        className={styles.button}
        isMedium={true}
        type="submit"
      >
        Сбросить пароль
      </PrimaryButton>
    </FormikForm>
  );
};
