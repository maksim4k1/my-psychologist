import { ChangePassowordForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const ChangePasswordPage: FC = () => {
  return (
    <FormPageLayout title="Смена пароля">
      <ChangePassowordForm />
    </FormPageLayout>
  );
};
