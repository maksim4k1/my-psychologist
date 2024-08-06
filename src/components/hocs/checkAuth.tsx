"use client";

import { ACCESS, AccessRole } from "../../config/access.config";
import { FunctionComponent, useEffect } from "react";
import AccessDeniedError from "../errors/AccessDeniedError";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  selectAuth,
  selectAuthLoginState,
} from "@/redux/features/auth/selectors";
import { redirect, usePathname, useRouter } from "next/navigation";
import LoadingLoop from "../statusLabels/LoadingLoop";

function checkAuth(
  Component: FunctionComponent,
  isNeedAuth: boolean = false,
  accessFor: AccessRole[] = [ACCESS.public],
): FunctionComponent {
  return function CheckAuthComponent() {
    const { isAuth, role } = useAppSelector(selectAuth);
    const { isLoading } = useAppSelector(selectAuthLoginState);
    const router = useRouter();
    const pathname = usePathname();

    const isOnlyForUnauthorized =
      !isNeedAuth &&
      isAuth &&
      accessFor.includes(ACCESS.unauthorized) &&
      accessFor.length === 1;

    const isOnlyForAuthorized = isNeedAuth && !isAuth;

    const forPsychologistAndHr =
      isAuth &&
      accessFor.includes(ACCESS.psychologist) &&
      accessFor.includes(ACCESS.hr) &&
      accessFor.length === 2 &&
      role !== ACCESS.psychologist &&
      role !== ACCESS.hr;

    const isOnlyForPsychologist =
      isAuth &&
      accessFor.includes(ACCESS.psychologist) &&
      accessFor.length === 1 &&
      role !== ACCESS.psychologist;

    const isOnlyForHr =
      isAuth &&
      accessFor.includes(ACCESS.hr) &&
      accessFor.length === 1 &&
      role !== ACCESS.hr;

    useEffect(() => {
      if (!isLoading) {
        if (pathname === "/auth/register" && isOnlyForUnauthorized)
          router.push(`/auth/register/success`);
        else if (isOnlyForUnauthorized) router.push("/");
        else if (isOnlyForAuthorized) router.push(`/auth/login`);
        else if (forPsychologistAndHr) router.push(`/auth/register/success`);
        else if (isOnlyForPsychologist) router.push(`/survey/psychologist`);
        else if (isOnlyForHr) router.push(`/survey/hr`);
      }
    }, [
      isOnlyForUnauthorized,
      forPsychologistAndHr,
      isOnlyForAuthorized,
      isOnlyForPsychologist,
      isOnlyForHr,
      router,
      pathname,
      isLoading,
    ]);

    if (isOnlyForUnauthorized || isOnlyForAuthorized || isOnlyForPsychologist)
      return <LoadingLoop />;

    if (
      accessFor.includes(ACCESS.public) ||
      accessFor.includes(role) ||
      (isAuth && accessFor.includes(ACCESS.client))
    ) {
      return <Component />;
    }

    return <AccessDeniedError />;
  };
}

export default checkAuth;
