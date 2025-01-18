import { ResetPasswordForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ResetPasswordPage: FC = () => {
  return (
    <FormPageLayout
      title="Восстановление пароля"
      comeBackLink={pages.login.path}
    >
      <ResetPasswordForm />
    </FormPageLayout>
  );
};
