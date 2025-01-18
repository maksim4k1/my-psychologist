import { LoginForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const LoginPage: FC = () => {
  return (
    <FormPageLayout title="Войти">
      <LoginForm />
    </FormPageLayout>
  );
};
