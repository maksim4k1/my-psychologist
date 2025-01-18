import { RegistrationForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const RegistrationPage: FC = () => {
  return (
    <FormPageLayout title="Регистрация">
      <RegistrationForm />
    </FormPageLayout>
  );
};
