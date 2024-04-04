import { ACCESS } from "../../../config/access.config";
import { FunctionComponent } from "react";
import NeedAuthErrorPage from "../errors/NeedAuth";
import OnlyForPsychologistErrorPage from "../errors/OnlyForPsychologist";
import AccessDeniedErrorPage from "../errors/AccessDenied";
import OnlyForUnauthorizedErrorPage from "../errors/OnlyForUnautorized";

function checkAuth(
  Component: FunctionComponent,
  isNeedAuth: boolean = false,
  accessFor: string[] = [ACCESS.public],
): FunctionComponent {
  return function CheckAuthComponent() {
    const isAuth: boolean = true;
    const currentRole: string = !isAuth
      ? ACCESS.unauthorized
      : ACCESS.psychologist;

    if (isNeedAuth && !isAuth) {
      return <NeedAuthErrorPage />;
    } else if (
      !isNeedAuth &&
      isAuth &&
      accessFor.includes(ACCESS.unauthorized) &&
      accessFor.length === 1
    ) {
      return <OnlyForUnauthorizedErrorPage />;
    }

    if (
      accessFor.includes(ACCESS.public) ||
      accessFor.includes(currentRole) ||
      (isAuth && accessFor.includes(ACCESS.client))
    ) {
      return <Component />;
    } else if (isAuth && accessFor.includes(ACCESS.psychologist)) {
      return <OnlyForPsychologistErrorPage />;
    } else {
      return <AccessDeniedErrorPage />;
    }
  };
}

export default checkAuth;
